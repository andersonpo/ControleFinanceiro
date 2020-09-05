# Controle Financeiro Pessoal

## Backend

- NodeJS
- Express
- JWT
- SQLite3

## Frontend

- Angular
- JWT

---

[BackEnd]

- npm run watch  
  http://localhost:3000

[FrontEnd]

- npm run start
- ng serve -o # angular cli instalado global  
  http://localhost:4200

---

## API

| Método | Url               | Descrição                  |
| ------ | ----------------- | -------------------------- |
| GET    | /users            | Lista de Usuários          |
| GET    | /users/{id}       | Busca por id               |
| POST   | /users            | Cria um novo usuário       |
| POST   | /users/{id}/photo | Atualiza a foto do usuário |
| PUT    | /users/{id}       | Atualiza o usuário         |
| DELETE | /users/{id}       | Exclui o usuário           |

---

### Pendências

- [BackEnd] Busca com paginação (hoje está no FrontEnd)
- [FrontEnd] Buscar "data:image/jpg;base64" trocar para ser dinamico (2 lugares => header e user-detail)

---
