import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/IUser';
import IResponse from '../interfaces/IResponse';

class Auth {
  getUserFromTokenHeader = (authorization: string): IUser => {
    try {
      // Bearer {TOKEN}
      const token = authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      return decode as IUser;
    } catch {
      return null;
    }
  };

  required = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any> => {
    const user = this.getUserFromTokenHeader(req.headers.authorization);
    if (user === null) {
      const response: IResponse = {
        message: 'Falha na autenticação (Header Token)',
      };
      return res.status(401).send(response);
    }
    next();
  };

  optional = (req: Request, res: Response, next: NextFunction): void => {
    next();
  };
}

export default Auth;
