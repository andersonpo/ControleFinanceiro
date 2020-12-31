# Inicializar NPM (package.json)

npm init -y

# Dependencias Dev

npm i -D typescript  
npm i -D eslint
npm i -D ts-node
npm i -D @types/node
npm i -D @typescript-eslint/parser  
npm i -D @typescript-eslint/eslint-plugin  
npm i -D @types/express
npm i -D @types/body-parser
npm i -D @types/bcrypt
npm i -D @types/jsonwebtoken
npm i -D nodemon
npm i -D @types/multer

# Dependencias Produção

npm i -S express => biblioteca web
npm i -S body-parser => receber dados atraves de json
npm i -S bcrypt => Cryptografia
npm i -S jsonwebtoken => JWT Token
npm i -S sqlite => banco de dados
npm i -S uuid => guid
npm i -S morgan => log
npm i -S multer => receber dados atraves de multipart/form-data
npm i -S typeorm => ORM, Banco de Dados, Migrations

# Arquivos de configuração

## TypeScript

Criar um arquivo **tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "esModuleInterop": true,
    "target": "ES6",
    "moduleResolution": "Node",
    "sourceMap": true,
    "outDir": "dist"
  }
}
```

## ESLint

Criar um arquivo com nome **.eslintrc**

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["node_modules", "dist"],
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "arrowFunctions": true
    }
  },
  "rules": {
    // Ver regras no site oficial
    // https://eslint.org/docs/rules/
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "eol-last": ["error", "always"],
    "linebreak-style": ["error", "windows"]
  }
}
```

## nodemon

Criar um arquivo com nome **nodemon.json**

```json
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src"],
  "exec": "npm run debug",
  "ext": "ts"
}
```

## package.json (scripts)

Adicionar/Alterar na seção **scripts**

```json
{
  "build": "tsc",
  "start": "build && node dist/app.js",
  "debug": "node --inspect=5858 -r ts-node/register ./src/server.ts",
  "watch": "nodemon",
  "test": "",
  "lint": "eslint ./src --ext .ts",
  "lint:fix": "eslint ./src --ext .ts --fix"
}
```

## Comandos

```json
npm run build ==> Transforma o typescript em javascript na pasta dist
npm run start ==> Executa o 'build' e inicia o app
npm run debug ==> Inicia o app em modo debug
npm run watch ==> Inicia o app em modo debug e escutando alterações (reinicia automaticamente)
npm run test ==> Executa os testes
npm run lint ==> Executa o ESLint
npm run lint:fix ==> Executa a correção apontada pelo ESLint
```

## Estrutura de Pastas

```
root
|- src  #codigo fonte
|  |- services
|  |  |- regras de negócio
|  |- interfaces
|  |  |- entidades
|  |- middlewares
|  |  |- logger
|  |  |- autenticacao (token jwt)
|  |  |- database (acesso ao banco de dados)
|  |- routes
|  |  |- definições das rotas
|  |- server.ts
|- dist
|- .eslintrc
|- tsconfig.json
|- nodemon.json
|- package.json
|- readme.md
|- node_modules
```
