import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import IResponse from './interfaces/IResponse';
import userRouters from './routes/user-router';
import categoryRouters from './routes/category-router';
import subCategoryRouters from './routes/subcategory-router';
import categorySubCategoryRouters from './routes/category-subcategory-router';
import UserService from './services/user-service';
import MigrationsService from './services/migrations-service';
import Auth from './middlewares/auth';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilita CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, PUT, POST, DELETE, GET'
    );
    return res.status(200).send({});
  }
  return next();
});

// registrar as Rotas
const auth = new Auth();
const userService = new UserService();
app.post('/login', userService.login);
app.use('/refreshtoken', auth.required, userService.refreshToken);
app.use('/users', userRouters);
app.use('/category', categoryRouters);
app.use('/subcategory', subCategoryRouters);
app.use('/category-subcategory', categorySubCategoryRouters);

// Tratamento de Erros (quando não encontrar a rota)
app.use((req: Request, res: Response, next: NextFunction) => {
  const erro: IResponse = {
    message: 'Endereço não encontrado',
    statusCode: 404,
  };
  next(erro);
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (response: IResponse, req: Request, res: Response, next: NextFunction) => {
    const defaultResponse: IResponse = {
      message: response.message || 'Erro Desconhecido, Tente Novamente!',
    };
    return res.status(response.statusCode || 500).send(defaultResponse);
  }
);

const runMigrations = async (): Promise<void> => {
  await new MigrationsService().execute().catch((err) => {
    console.error('Migrations Error', err);
  });
};

export default app;
export { runMigrations };
