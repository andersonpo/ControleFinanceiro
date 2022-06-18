import { Database, open, ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';
import environment from '../environment';

class DataBase {
  private open = async (): Promise<Database> => {
    const databasePath =
      process.env.DATABASE_PATH || environment.DATABASE_PATH || ':memory:';

    let db: Database;
    try {
      db = await open({
        driver: sqlite3.Database,
        filename: databasePath,
      });

      db.on('trace', (data) => {
        // eslint-disable-next-line no-console
        console.info('\n', data);
      });

      return db;
    }
    catch (error) {
      console.error('database open error', error.message);
      return null;
    }
  };

  private close = async (db: Database): Promise<void> => {
    if (db != null && db != undefined) {
      await db.close();
    }
  };

  executeNonQuery = async (query: string): Promise<void> => {
    await this.open().then(async (db: Database)=> {
      if (db) {
        await db.exec(query).then(async () => {
          await this.close(db); 
        })
      }
    });
  };

  execute = async (query: string, ...params: any[]): Promise<ISqlite.RunResult<sqlite3.Statement>> => {
    let result : ISqlite.RunResult<sqlite3.Statement>;
    await this.open().then(async (db: Database) => {
      if (db) {
        result = await db.run(query, params);
        await this.close(db);
        return result;
      }
    });
    return result;
  };

  getSingle = async (query: string, ...params: any[]): Promise<any> => {
    let result : ISqlite.RunResult<sqlite3.Statement>;
    await this.open().then(async (db: Database) => {
      if (db) {
        result = await db.get(query, params);
        await this.close(db);
      }
    });    
    return result;
  };

  getMany = async (query: string, ...params: any[]): Promise<any[]> => {
    let result : any[];
    await this.open().then(async (db: Database) => {
      if (db) {
        result = await db.all(query, params);
        await this.close(db);
      }
    });
    
    return result;
  };
}

export default DataBase;
