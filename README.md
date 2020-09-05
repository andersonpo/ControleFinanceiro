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

[Login]
- admin@admin.com
- admin

---

## API

| Método | Url                        | Descrição                                             |
| ------ | -------------------------- | ----------------------------------------------------- |
| GET    | /users                     | Lista de Usuários                                     |
| GET    | /users/{id}                | Busca por id do usuário                               |
| POST   | /users                     | Cria um novo usuário                                  |
| POST   | /users/{id}/photo          | Atualiza a foto do usuário                            |
| PUT    | /users/{id}                | Atualiza o usuário                                    |
| DELETE | /users/{id}                | Exclui o usuário                                      |
| GET    | /category                  | Lista de Categoria                                    |
| GET    | /category/{id}             | Busca por Id da Categoria                             |
| POST   | /category                  | Cria um novo Categoria                                |
| PUT    | /category/{id}             | Atualiza o Categoria                                  |
| DELETE | /category/{id}             | Exclui o Categoria                                    |
| GET    | /subcategory               | Lista de SubCategoria                                 |
| GET    | /subcategory/{id}          | Busca por Id da SubCategoria                          |
| POST   | /subcategory               | Cria um novo SubCategoria                             |
| PUT    | /subcategory/{id}          | Atualiza o SubCategoria                               |
| DELETE | /subcategory/{id}          | Exclui o SubCategoria                                 |
| GET    | /category-subcategory      | Lista de Vinculos entre Categoria e SubCategoria      |
| GET    | /category-subcategory/{id} | Busca por Id o vinculo entre Categoria e SubCategoria |
| POST   | /category-subcategory      | Cria um novo vinculo entre Categoria e SubCategoria   |
| DELETE | /category-subcategory/{id} | Exclui o Vinculo entre Categoria e SubCategoria       |

---

### Pendências

- Criar Contas (Accounts -> Id, Name, Date, Value_Start, Value_Current)
- Criar Lançamentos (Moviments -> Id, Date, Date_Payment?, Account_Id, Paid, Value, Category_Id, SubCategory_Id?)
- Vincular usuario as tabelas (Usuario X acessa os dados do X, usuario Y dados Y...)
- Relatórios (Entradas vs Saídas, Lançamentos Futuros, Lançamentos Vencidos)
- Gráficos
---
