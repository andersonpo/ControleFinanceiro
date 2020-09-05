import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ICategory from '../interfaces/ICategory';
import IResponse from '../interfaces/IResponse';
import DataBase from './database-service';
import ISubCategory from '../interfaces/ISubCategory';
import ICategoryWithSubCategories from '../interfaces/ICategoryWithSubCategory';
import environment from '../environment';

class CategoryService {
  private database = new DataBase();

  getCount = async (): Promise<number> => {
    const query = 'SELECT COUNT(1) total FROM category';
    const result = await this.database.getSingle(query);
    return result.total;
  };

  listCategories = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    let response: IResponse = { message: null };
    const pageSize = Number(req.query.pageSize || environment.pageSize);
    const pageIndex = Number(req.query.pageIndex || environment.pageIndex);

    console.log('page', pageIndex, pageSize, req.query);
    if (pageSize < 1 || pageIndex < 1) {
      response = {
        message: 'pageSize e pageIndex deve ser maior que zero',
      };
      return res.status(400).send(response);
    }
    const query =
      'SELECT * FROM category s ORDER BY s.name ASC LIMIT ' +
      pageSize +
      ' OFFSET ' +
      (pageIndex - 1) * pageSize;
    const result = await this.database.getMany(query);

    const rowsCount = await this.getCount();

    response = {
      'result': result,
      'pageIndex': pageIndex,
      'pageSize': pageSize,
      'pageTotal': Math.ceil(rowsCount / pageSize),
      'rowsTotal': rowsCount,
    };
    return res.status(200).send(response);
  };

  getCategoryById = async (id: string): Promise<ICategory> => {
    const category: ICategory = {
      'Id': '',
      'Icon': '',
      'Name': '',
      'Color': '',
    };
    const result = await this.database.getSingle(
      'SELECT * FROM category u WHERE u.id = ?',
      id
    );

    if (result != undefined) {
      category.Id = result.id;
      category.Name = result.name;
      category.Color = result.color;
      category.Icon = result.icon;
    }

    if (category.Id?.length > 0) {
      return category;
    } else {
      return null;
    }
  };

  getCategoryByName = async (name: string): Promise<ICategory> => {
    const category: ICategory = {
      'Id': '',
      'Name': '',
      'Color': '',
      'Icon': '',
    };

    const result = await this.database.getSingle(
      'SELECT * FROM category s WHERE s.Name = ?',
      name
    );
    if (result != undefined) {
      category.Id = result.id;
      category.Name = result.name;
      category.Icon = result.icon;
      category.Color = result.color;
    }

    if (category.Id?.length > 0) {
      return category;
    } else {
      return null;
    }
  };

  findCategoryById = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const category = await this.getCategoryById(id);

    if (id.length <= 0) {
      return res.status(400).send({ 'message': 'Categoria ID inválido' });
    }

    if (category === null || category === undefined) {
      return res.status(404).send({ 'message': 'Categoria não encontrado' });
    }

    const response: IResponse = {
      'message': 'Categoria encontrado com sucesso',
      'result': category,
    };

    return res.status(200).send(response);
  };

  findCategoryWithSubCategoriesById = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const category_id = req.params.id;
    let query = 'SELECT cs.id';
    query += ' ,c.id c_id, c.name c_name, c.color c_color, c.icon c_icon';
    query += ' ,s.id s_id, s.name s_name, s.icon s_icon, s.color s_color';
    query += ' FROM category_subcategory cs';
    query += ' INNER JOIN category c ON (cs.category_id = c.id)';
    query += ' LEFT JOIN subcategory s ON (cs.subcategory_id = s.id)';
    query += ' WHERE c.id = ?';
    const result = await this.database.getMany(query, category_id);

    let categoriesWithSubCategories: ICategoryWithSubCategories;
    let subCategories: Array<ISubCategory> = [];
    let subCategory: ISubCategory;

    result.forEach((item) => {
      subCategory = {
        Id: item.s_id,
        Name: item.s_name,
        Icon: item.s_icon,
        Color: item.s_color,
      };
      subCategories.push(subCategory);

      categoriesWithSubCategories = {
        Id: item.c_id,
        Name: item.c_name,
        Icon: item.c_icon,
        Color: item.c_color,
        SubCategories: subCategories,
      };
    });

    const response: IResponse = {
      'message': 'Categoria_SubCategoria encontrado com sucesso',
      'result': categoriesWithSubCategories,
    };

    return res.status(200).send(response);
  };

  createCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const name: string = req.body.name;
    const icon: string = req.body.icon;
    const color: string = req.body.color;
    let category = await this.getCategoryByName(name);

    if (category != undefined) {
      return res.status(202).send({ 'message': 'Categoria já cadastrado' });
    }

    if (name?.length < 3) {
      return res.status(400).send({
        'message': 'Dados inválidos (name < 3)',
      });
    }

    const query =
      'INSERT INTO category (id, name, icon, color) VALUES (?,?,?,?)';
    const result = await this.database.execute(
      query,
      uuidv4(),
      name,
      icon,
      color
    );

    if (result.changes <= 0) {
      return res.status(500).send({ 'message': 'Nenhum registro incluido' });
    }

    category = await this.getCategoryByName(name);
    const response: IResponse = {
      'message': 'Categoria criado com sucesso',
      'result': category,
    };
    return res.status(201).send(response);
  };

  updateCategory = async (req: Request, res: Response): Promise<IResponse> => {
    const id = req.params.id as string;
    const name: string = req.body.name;
    const icon: string = req.body.icon;
    const color: string = req.body.color;

    let category = await this.getCategoryById(id);

    if (category === null || category === undefined) {
      return res.status(404).send({ 'message': 'Categoria não encontrado' });
    }

    const query =
      'UPDATE category SET name = ?, icon = ?, color = ? WHERE id = ?';
    const result = await this.database.execute(
      query,
      name,
      icon,
      color,
      category.Id
    );

    if (result.changes <= 0) {
      return res.status(500).send({ 'message': 'Nenhum registro atualizado' });
    }

    category = await this.getCategoryById(id);
    const response: IResponse = {
      'message': 'Categoria atualizado com sucesso',
      'result': category,
    };

    return res.status(200).send(response);
  };

  deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const category = await this.getCategoryById(id);

    if (category === null || category === undefined) {
      return res.status(404).send({ 'message': 'Categoria não encontrado' });
    }

    const query = 'DELETE FROM category WHERE id = ?';
    const result = await this.database.execute(query, category.Id);

    if (result.changes <= 0) {
      return res.status(500).send({ 'message': 'Nenhum registro excluido' });
    }

    const response: IResponse = {
      'message': 'Categoria excluido com sucesso',
    };

    return res.status(200).send(response);
  };
}

export default CategoryService;
