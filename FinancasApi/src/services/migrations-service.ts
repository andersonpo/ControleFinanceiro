import DataBase from './database-service';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class MigrationsService {
  private database = new DataBase();

  private createTables = async (): Promise<void> => {
    let query = '';
    let exists = false;

    query = 'CREATE TABLE IF NOT EXISTS user (';
    query += ' id VARCHAR(100) NOT NULL';
    query += ' ,name VARCHAR(100) NOT NULL';
    query += ' ,email VARCHAR(100) NOT NULL';
    query += ' ,password VARCHAR(100) NOT NULL';
    query += ' ,PRIMARY KEY (id)';
    query += ');';

    await this.database.executeNonQuery(query);

    query = 'select name from pragma_table_info("user") where name = "photo"';
    exists = await this.database.getSingle(query);

    if (exists === null || exists === undefined) {
      query = 'ALTER TABLE user ADD COLUMN photo TEXT';
      await this.database.executeNonQuery(query);
    }

    query =
      'select name from pragma_table_info("user") where name = "photo_type"';
    exists = await this.database.getSingle(query);

    if (exists === null || exists === undefined) {
      query = 'ALTER TABLE user ADD COLUMN photo_type VARCHAR(30)';
      await this.database.executeNonQuery(query);
    }

    query = 'CREATE TABLE IF NOT EXISTS category (';
    query += ' id VARCHAR(100) NOT NULL';
    query += ' ,name VARCHAR(100) NOT NULL';
    query += ' ,icon VARCHAR(30) NOT NULL';
    query += ' ,color VARCHAR(10) NOT NULL';
    query += ');';

    await this.database.executeNonQuery(query);

    query = 'CREATE TABLE IF NOT EXISTS subcategory (';
    query += ' id VARCHAR(100) NOT NULL';
    query += ' ,name VARCHAR(100) NOT NULL';
    query += ' ,icon VARCHAR(30) NOT NULL';
    query += ' ,color VARCHAR(10) NOT NULL';
    query += ');';

    await this.database.executeNonQuery(query);

    query = 'CREATE TABLE IF NOT EXISTS category_subcategory (';
    query += ' id VARCHAR(100) NOT NULL';
    query += ' ,category_id VARCHAR(100) NOT NULL';
    query += ' ,subcategory_id VARCHAR(100) NOT NULL';
    query += ');';

    await this.database.executeNonQuery(query);
  };

  private populateTables = async (): Promise<void> => {
    let query = '';
    let exists = false;
    let result: any = null;

    const userAdminId = '1fc51ea5-65c1-493b-980e-fabcf2bc6a33';

    query = 'SELECT id FROM user u WHERE u.id = ?';
    exists = await this.database.getSingle(query, userAdminId);

    if (exists === null || exists === undefined) {
      query = 'INSERT INTO user (id, name, email, password) VALUES';
      query += '(?, "Administrador", "admin@admin.com", ?);';
      const hash = bcrypt.hashSync('admin', 10);
      await this.database.execute(query, userAdminId, hash);
    }

    query = 'SELECT id FROM category';
    exists = await this.database.getSingle(query);
    if (exists === null || exists === undefined) {
      query = 'INSERT INTO category (id, name, icon, color) VALUES';
      query += '(?, "Receitas", "fa-chart-line", "#2AA117")';
      await this.database.execute(query, uuidv4());

      query = 'INSERT INTO category (id, name, icon, color) VALUES';
      query += '(?, "Despesas", "fa-chart-line-down", "#A11717")';
      await this.database.execute(query, uuidv4());
    }

    query = 'SELECT id FROM subcategory';
    exists = await this.database.getSingle(query);
    if (exists === null || exists === undefined) {
      query = 'INSERT INTO subcategory (id, name, icon, color) VALUES';
      query += '(?, "Salário", "fa-sack-dollar", "#2A72C3")';
      await this.database.execute(query, uuidv4());

      query = 'INSERT INTO subcategory (id, name, icon, color) VALUES';
      query += '(?, "Vale", "fa-sack-dollar", "#C3B62A")';
      await this.database.execute(query, uuidv4());

      query = 'INSERT INTO subcategory (id, name, icon, color) VALUES';
      query += '(?, "Cartão Débito", "fa-credit-card-front", "#C3762A")';
      await this.database.execute(query, uuidv4());

      query = 'INSERT INTO subcategory (id, name, icon, color) VALUES';
      query += '(?, "Cartão Crédito", "fa-credit-card", "#733FC2")';
      await this.database.execute(query, uuidv4());
    }

    let categoryReceitaId = 0;
    let categoryDespesaId = 0;
    let subcategorySalarioId = 0;
    let subcategoryValeId = 0;
    let subcategoryCartaoDebitoId = 0;
    let subcategoryCartaoCreditoId = 0;

    query = 'SELECT id FROM category_subcategory';
    exists = await this.database.getSingle(query);
    if (exists === null || exists === undefined) {
      query = 'SELECT id FROM category c WHERE c.name = ?';
      result = await this.database.getSingle(query, 'Receitas');
      categoryReceitaId = result.id;
      result = await this.database.getSingle(query, 'Despesas');
      categoryDespesaId = result.id;

      query = 'SELECT id FROM subcategory s WHERE s.name = ?';
      result = await this.database.getSingle(query, 'Salário');
      subcategorySalarioId = result.id;
      result = await this.database.getSingle(query, 'Vale');
      subcategoryValeId = result.id;
      result = await this.database.getSingle(query, 'Cartão Débito');
      subcategoryCartaoDebitoId = result.id;
      result = await this.database.getSingle(query, 'Cartão Crédito');
      subcategoryCartaoCreditoId = result.id;

      query =
        'INSERT INTO category_subcategory (id, category_id, subcategory_id) VALUES (?,?,?);';
      await this.database.execute(
        query,
        uuidv4(),
        categoryReceitaId,
        subcategorySalarioId
      );
      await this.database.execute(
        query,
        uuidv4(),
        categoryReceitaId,
        subcategoryValeId
      );

      await this.database.execute(
        query,
        uuidv4(),
        categoryDespesaId,
        subcategoryCartaoDebitoId
      );
      await this.database.execute(
        query,
        uuidv4(),
        categoryDespesaId,
        subcategoryCartaoCreditoId
      );
    }
  };

  execute = async (): Promise<void> => {
    const separator = '#'.repeat(80);
    // eslint-disable-next-line no-console
    console.log(`${separator}\nMigrations Started`);

    await this.createTables();
    await this.populateTables();

    // eslint-disable-next-line no-console
    console.log(`${separator}\nMigrations End`);
  };
}

export default MigrationsService;
