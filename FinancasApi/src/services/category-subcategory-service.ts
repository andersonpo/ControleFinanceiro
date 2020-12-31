import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import IResponse from '../interfaces/IResponse';
import DataBase from './database-service';
import ICategorySubcategory from '../interfaces/ICategorySubcategory';
import environment from '../environment';

class CategorySubCategoryService {
  private database = new DataBase();

  getCount = async (): Promise<number> => {
    const query = 'SELECT COUNT(1) total FROM category_subcategory';
    const result = await this.database.getSingle(query);
    return result.total;
  };

  listCategoriesWithSubCategories = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    let response: IResponse = { message: null };
    const pageSize = Number(req.query.pageSize || environment.PAGE_SIZE);
    const pageIndex = Number(req.query.pageIndex || environment.PAGE_INDEX);

    if (pageSize < 1 || pageIndex < 1) {
      response = {
        message: 'pageSize e pageIndex deve ser maior que zero',
      };
      return res.status(400).send(response);
    }

    let query = 'SELECT cs.id';
    query += ' ,c.id c_id, c.name c_name, c.color c_color, c.icon c_icon';
    query += ' ,s.id s_id, s.name s_name, s.icon s_icon, s.color s_color';
    query += ' FROM category_subcategory cs';
    query += ' LEFT JOIN category c ON (cs.category_id = c.id)';
    query += ' LEFT JOIN subcategory s ON (cs.subcategory_id = s.id)';
    query += ' ORDER BY c.name, s.name ASC';
    query += ' LIMIT ' + pageSize + ' OFFSET ' + (pageIndex - 1) * pageSize;
    const result = await this.database.getMany(query);

    // loop montando objeto
    const categoriesWithSubCategories: Array<ICategorySubcategory> = [];
    let categorySubCategory: ICategorySubcategory;

    result.forEach((item) => {
      categorySubCategory = {
        Id: item.id,
        Category: {
          Id: item.c_id,
          Name: item.c_name,
          Icon: item.c_icon,
          Color: item.c_color,
        },
        SubCategory: {
          Id: item.s_id,
          Name: item.s_name,
          Icon: item.s_icon,
          Color: item.s_color,
        },
      };
      categoriesWithSubCategories.push(categorySubCategory);
    });

    const rowsCount = await this.getCount();

    response = {
      result: categoriesWithSubCategories,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageTotal: Math.ceil(rowsCount / pageSize),
      rowsTotal: rowsCount,
    };
    return res.status(200).send(response);
  };

  getCategorySubCategoryById = async (
    id: string
  ): Promise<ICategorySubcategory> => {
    let query = 'SELECT cs.id';
    query += ' ,c.id c_id, c.name c_name, c.color c_color, c.icon c_icon';
    query += ' ,s.id s_id, s.name s_name, s.icon s_icon, s.color s_color';
    query += ' FROM category_subcategory cs';
    query += ' INNER JOIN category c ON (cs.category_id = c.id)';
    query += ' LEFT JOIN subcategory s ON (cs.subcategory_id = s.id)';
    query += ' WHERE cs.id = ?';
    const result = await this.database.getMany(query, id);

    // loop montando objeto
    let categorySubCategories: ICategorySubcategory;

    result.forEach((item) => {
      categorySubCategories = {
        Id: item.id,
        Category: {
          Id: item.c_id,
          Name: item.c_name,
          Icon: item.c_icon,
          Color: item.c_color,
        },
        SubCategory: {
          Id: item.s_id,
          Name: item.s_name,
          Icon: item.s_icon,
          Color: item.s_color,
        },
      };
    });

    if (categorySubCategories?.Id?.length > 0) {
      return categorySubCategories;
    } else {
      return null;
    }
  };

  findCategorySubCategoryById = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const subcategory = await this.getCategorySubCategoryById(id);

    if (id.length <= 0) {
      return res
        .status(400)
        .send({ message: 'Categoria_SubCategoria ID inválido' });
    }

    if (subcategory === null || subcategory === undefined) {
      return res
        .status(404)
        .send({ message: 'Categoria_SubCategoria não encontrado' });
    }

    const response: IResponse = {
      message: 'Categoria_SubCategoria encontrado com sucesso',
      result: subcategory,
    };

    return res.status(200).send(response);
  };

  createCategorySubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const cId: string = req.body.category_id;
    const sId: string = req.body.subcategory_id;

    if (cId?.length < 1 || sId.length < 1) {
      return res.status(400).send({
        message: 'Dados inválidos (category_id, subcategory_id)',
      });
    }

    const query =
      'INSERT INTO category_subcategory (id, category_id, subcategory_id) VALUES (?,?,?)';
    const result = await this.database.execute(query, uuidv4(), cId, sId);

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro incluido' });
    }

    const response: IResponse = {
      message: 'Categoria_SubCategoria criado com sucesso',
      result: null,
    };
    return res.status(201).send(response);
  };

  deleteCategorySubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const categorySubCategory = await this.getCategorySubCategoryById(id);

    if (categorySubCategory === null || categorySubCategory === undefined) {
      return res
        .status(404)
        .send({ message: 'Categoria_SubCategoria não encontrado' });
    }

    const query = 'DELETE FROM category_subcategory WHERE id = ?';
    const result = await this.database.execute(query, categorySubCategory.Id);

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro excluido' });
    }

    const response: IResponse = {
      message: 'Categoria_SubCategoria excluido com sucesso',
    };

    return res.status(200).send(response);
  };
}

export default CategorySubCategoryService;
