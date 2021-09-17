# Inicializar NPM (package.json)

npm init -y

# Dependencias Dev

npm i -D typescript  <br> 
npm i -D eslint <br>
npm i -D ts-node <br>
npm i -D @types/node <br> 
npm i -D @typescript-eslint/parser <br> 
npm i -D @typescript-eslint/eslint-plugin <br> 
npm i -D @types/express <br> 
npm i -D @types/body-parser <br> 
npm i -D @types/bcrypt <br> 
npm i -D @types/jsonwebtoken <br> 
npm i -D nodemon <br> 
npm i -D @types/multer <br> 

# Dependencias Produção

npm i -S express => biblioteca web <br> 
npm i -S body-parser => receber dados atraves de json <br> 
npm i -S bcrypt => Cryptografia <br> 
npm i -S jsonwebtoken => JWT Token <br> 
npm i -S sqlite => banco de dados <br> 
npm i -S uuid => guid <br> 
npm i -S morgan => log <br> 
npm i -S multer => receber dados atraves de multipart/form-data <br> 
npm i -S typeorm => ORM, Banco de Dados, Migrations <br> 

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
    "semi": ["error", "always", { "omitLastInOneLineBlock": false }],
    "no-extra-semi": ["error"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "quote-props": ["error", "as-needed"],
    "eol-last": ["error", "always"],
    "linebreak-style": ["error", "windows"],
    "@typescript-eslint/no-explicit-any": ["off", { "ignoreRestArgs": true }],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-extra-semi": "error"
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
