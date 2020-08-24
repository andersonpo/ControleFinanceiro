import DataBase from './database-service';
import bcrypt from 'bcrypt';

class MigrationsService {
  private database = new DataBase();

  private createTables = async (): Promise<void> => {
    let query = '';

    query = 'CREATE TABLE IF NOT EXISTS user (';
    query += ' id varchar(100) NOT NULL';
    query += ' ,name varchar(100) NOT NULL';
    query += ' ,email varchar(100) NOT NULL';
    query += ' ,password varchar(100) NOT NULL';
    query += ' ,PRIMARY KEY (id)';
    query += ');';

    await this.database.executeNonQuery(query);
  };

  private populateTables = async (): Promise<void> => {
    let query = 'INSERT INTO user (id, name, email, password) VALUES';
    query += '(?, "Administrador", "admin@admin.com", ?);';

    const id = '1fc51ea5-65c1-493b-980e-fabcf2bc6a33';

    const exists = await this.database.getSingle(
      'SELECT * FROM user u WHERE u.id = ?',
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
