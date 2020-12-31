import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ISubCategory from '../interfaces/ISubCategory';
import IResponse from '../interfaces/IResponse';
import DataBase from './database-service';
import environment from '../environment';

class SubCategoryService {
  private database = new DataBase();

  getCount = async (): Promise<number> => {
    const query = 'SELECT COUNT(1) subcategory FROM user';
    const result = await this.database.getSingle(query);
    return result.total;
  };

  listSubCategories = async (
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

    const query =
      'SELECT * FROM subcategory s ORDER BY s.name ASC LIMIT ' +
      pageSize +
      ' OFFSET ' +
      (pageIndex - 1) * pageSize;
    const result = await this.database.getMany(query);

    const rowsCount = await this.getCount();

    response = {
      result: result,
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageTotal: Math.ceil(rowsCount / pageSize),
      rowsTotal: rowsCount,
    };
    return res.status(200).send(response);
  };

  getSubCategoryById = async (id: string): Promise<ISubCategory> => {
    const subcategory: ISubCategory = {
      Id: '',
      Icon: '',
      Name: '',
      Color: '',
    };
    const result = await this.database.getSingle(
      'SELECT * FROM subcategory u WHERE u.id = ?',
      id
    );

    if (result != undefined) {
      subcategory.Id = result.id;
      subcategory.Name = result.name;
      subcategory.Color = result.color;
      subcategory.Icon = result.icon;
    }

    if (subcategory.Id?.length > 0) {
      return subcategory;
    } else {
      return null;
    }
  };

  getSubCategoryByName = async (name: string): Promise<ISubCategory> => {
    const subcategory: ISubCategory = {
      Id: '',
      Name: '',
      Color: '',
      Icon: '',
    };

    const result = await this.database.getSingle(
      'SELECT * FROM subcategory s WHERE s.Name = ?',
      name
    );
    if (result != undefined) {
      subcategory.Id = result.id;
      subcategory.Name = result.name;
      subcategory.Icon = result.icon;
      subcategory.Color = result.color;
    }

    if (subcategory.Id?.length > 0) {
      return subcategory;
    } else {
      return null;
    }
  };

  findSubCategoryById = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const subcategory = await this.getSubCategoryById(id);

    if (id.length <= 0) {
      return res.status(400).send({ message: 'SubCategoria ID inválido' });
    }

    if (subcategory === null || subcategory === undefined) {
      return res.status(404).send({ message: 'SubCategoria não encontrado' });
    }

    const response: IResponse = {
      message: 'SubCategoria encontrado com sucesso',
      result: subcategory,
    };

    return res.status(200).send(response);
  };

  createSubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const name: string = req.body.name;
    const icon: string = req.body.icon;
    const color: string = req.body.color;
    let subcategory = await this.getSubCategoryByName(name);

    if (subcategory != undefined) {
      return res.status(202).send({ message: 'SubCategoria já cadastrado' });
    }

    if (name?.length < 3) {
      return res.status(400).send({
        message: 'Dados inválidos (name < 3)',
      });
    }

    const query =
      'INSERT INTO subcategory (id, name, icon, color) VALUES (?,?,?,?)';
    const result = await this.database.execute(
      query,
      uuidv4(),
      name,
      icon,
      color
    );

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro incluido' });
    }

    subcategory = await this.getSubCategoryByName(name);
    const response: IResponse = {
      message: 'SubCategoria criado com sucesso',
      result: subcategory,
    };
    return res.status(201).send(response);
  };

  updateSubCategory = async (
    req: Request,
    res: Response
  ): Promise<IResponse> => {
    const id = req.params.id as string;
    const name: string = req.body.name;
    const icon: string = req.body.icon;
    const color: string = req.body.color;

    let subcategory = await this.getSubCategoryById(id);

    if (subcategory === null || subcategory === undefined) {
      return res.status(404).send({ message: 'SubCategoria não encontrado' });
    }

    const query =
      'UPDATE subcategory SET name = ?, icon = ?, color = ? WHERE id = ?';
    const result = await this.database.execute(
      query,
      name,
      icon,
      color,
      subcategory.Id
    );

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro atualizado' });
    }

    subcategory = await this.getSubCategoryById(id);
    const response: IResponse = {
      message: 'SubCategoria atualizado com sucesso',
      result: subcategory,
    };

    return res.status(200).send(response);
  };

  deleteSubCategory = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const subcategory = await this.getSubCategoryById(id);

    if (subcategory === null || subcategory === undefined) {
      return res.status(404).send({ message: 'SubCategoria não encontrado' });
    }

    const query = 'DELETE FROM subcategory WHERE id = ?';
    const result = await this.database.execute(query, subcategory.Id);

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro excluido' });
    }

    const response: IResponse = {
      message: 'SubCategoria excluido com sucesso',
    };

    return res.status(200).send(response);
  };
}

export default SubCategoryService;
