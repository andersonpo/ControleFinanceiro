import DataBase from './database-service';
import bcrypt from 'bcrypt';

class MigrationsService {
  private database = new DataBase();

  private createTables = async (): Promise<void> => {
    let query = '';

    query = 'CREATE TABLE IF NOT EXISTS user (';
    query += ' id VARCHAR(100) NOT NULL';
    query += ' ,name VARCHAR(100) NOT NULL';
    query += ' ,email VARCHAR(100) NOT NULL';
    query += ' ,password VARCHAR(100) NOT NULL';
    query += ' ,PRIMARY KEY (id)';
    query += ');';

    await this.database.executeNonQuery(query);

    query = 'select name from pragma_table_info(\'user\') where name = \'photo\'';
    const exists = await this.database.getSingle(query);

    if (exists === null || exists === undefined) {
      query = 'ALTER TABLE user ADD COLUMN photo TEXT';
      await this.database.executeNonQuery(query);
    }
  };

  private populateTables = async (): Promise<void> => {
    let query = 'INSERT INTO user (id, name, email, password) VALUES';
    query += '(?, "Administrador", "admin@admin.com", ?);';

    const id = '1fc51ea5-65c1-493b-980e-fabcf2bc6a33';

    const exists = await this.database.getSingle(
      'SELECT id FROM user u WHERE u.id = ?',
      id
    );

    if (exists === null || exists === undefined) {
      const hash = bcrypt.hashSync('admin', 10);
      await this.database.execute(query, id, hash);
    }
  };

  execute = async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('Migrations Started');

    await this.createTables();
    await this.populateTables();

    // eslint-disable-next-line no-console
    console.log('Migrations End');
  };
}

export default MigrationsService;
