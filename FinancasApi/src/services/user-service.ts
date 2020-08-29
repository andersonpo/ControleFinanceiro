import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import IUser from '../interfaces/IUser';
import IResponse from '../interfaces/IResponse';
import DataBase from './database-service';
import Auth from '../middlewares/auth';

class UserService {
  private database = new DataBase();

  listUsers = async (req: Request, res: Response): Promise<Response<any>> => {
    const query = 'SELECT * FROM user u ORDER BY u.name ASC';
    const result = await this.database.getMany(query);

    // remove passwords
    result.map((u) => {
      u.password = null;
    });

    const response: IResponse = {
      result: result,
    };
    return res.status(200).send(response);
  };

  getUserByEmail = async (email: string): Promise<IUser> => {
    const user: IUser = { Id: '', Name: '', Email: '', Password: '' };

    const result = await this.database.getSingle(
      'SELECT * FROM user u WHERE u.Email = ?',
      email
    );
    if (result != undefined) {
      user.Id = result.id;
      user.Name = result.name;
      user.Email = result.email;
      user.Password = result.password;
    }

    if (user.Id?.length > 0) {
      return user;
    } else {
      return null;
    }
  };

  getUserById = async (id: string): Promise<IUser> => {
    const user: IUser = { Id: '', Name: '', Email: '', Password: '' };
    const result = await this.database.getSingle(
      'SELECT * FROM user u WHERE u.id = ?',
      id
    );

    if (result != undefined) {
      user.Id = result.id;
      user.Name = result.name;
      user.Email = result.email;
      user.Password = result.password;
    }

    if (user.Id?.length > 0) {
      return user;
    } else {
      return null;
    }
  };

  findUserById = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const user = await this.getUserById(id);

    if (id.length <= 0) {
      return res.status(400).send({ message: 'Usuário ID inválido' });
    }

    if (user === null || user === undefined) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    const response: IResponse = {
      message: 'Usuário encontrado com sucesso',
      result: user,
    };

    return res.status(200).send(response);
  };

  createUser = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    let user = await this.getUserByEmail(email);

    if (user != undefined) {
      return res.status(202).send({ message: 'Usuário já cadastrado' });
    }

    if (name?.length < 3 || email?.length < 8 || password?.length < 8) {
      return res.status(400).send({
        message: 'Dados inválidos (name < 3, email < 8, password < 8)',
      });
    }

    const hash = bcrypt.hashSync(password, 10);
    const query =
      'INSERT INTO user (id, name, email, password) VALUES (?,?,?,?)';
    const result = await this.database.execute(
      query,
      uuidv4(),
      name,
      email,
      hash
    );

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro incluido' });
    }

    user = await this.getUserByEmail(email);
    const response: IResponse = {
      message: 'Usuário criado com sucesso',
      result: user,
    };
    return res.status(201).send(response);
  };

  updateUser = async (req: Request, res: Response): Promise<IResponse> => {
    const id = req.params.id as string;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    let user = await this.getUserById(id);

    if (user === null || user === undefined) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    const hash = bcrypt.hashSync(password, 10);

    const query =
      'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?';
    const result = await this.database.execute(
      query,
      name,
      email,
      hash,
      user.Id
    );

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro atualizado' });
    }

    user = await this.getUserById(id);
    const response: IResponse = {
      message: 'Usuário atualizado com sucesso',
      result: user,
    };

    return res.status(200).send(response);
  };

  deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const id = req.params.id as string;
    const user = await this.getUserById(id);

    if (user === null || user === undefined) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    const query = 'DELETE FROM user WHERE id = ?';
    const result = await this.database.execute(query, user.Id);

    if (result.changes <= 0) {
      return res.status(500).send({ message: 'Nenhum registro excluido' });
    }

    const response: IResponse = {
      message: 'Usuário excluido com sucesso',
    };

    return res.status(200).send(response);
  };

  login = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    const email = req.body.email;
    const password = req.body.password;
    const defaultMessage = 'Usuário ou Senha inválidos';

    const user: IUser = await this.getUserByEmail(email);
    if (user === undefined || user === null) {
      return res.status(401).send({ message: defaultMessage });
    }

    if (await bcrypt.compare(password, user.Password)) {
      const token = jwt.sign(
        {
          userId: user.Id,
          name: user.Name,
          email: user.Email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRES || '1h',
          issuer: process.env.TOKEN_ISSUER || 'issuer-webapi',
        }
      );

      const response: IResponse = {
        message: 'Autenticado com sucesso',
        token: token,
      };

      return res.status(200).send(response);
    }

    return res.status(401).send({ message: defaultMessage });
  };

  refreshToken = async (
    req: Request,
    res: Response
  ): Promise<Response<IResponse>> => {
    const auth = new Auth();
    const user = auth.getUserFromTokenHeader(req.headers.authorization);
    const token = jwt.sign(
      {
        userId: user.Id,
        name: user.Name,
        email: user.Email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRES || '1h',
        issuer: process.env.TOKEN_ISSUER || 'issuer-webapi',
      }
    );

    const response: IResponse = {
      message: 'Token atualizado com sucesso',
      token: token,
    };

    return res.status(200).send(response);
  };
}

export default UserService;