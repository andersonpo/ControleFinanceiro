import { Database, open, Statement, ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';

class DataBase {
  private db: Database;

  private open = async (): Promise<void> => {
    this.db = await open({
      driver: sqlite3.Database,
      filename: process.env.DATABASE_PATH || ':memory',
    });

    this.db.on('trace', (data) => {
      // eslint-disable-next-line no-console
      console.log(
        '\n############################################################\n',
        data,
        '\n############################################################'
      );
    });
  };

  private close = async (): Promise<void> => {
    if (this.db != null && this.db != undefined) {
      this.db.close();
    }
  };

  executeNonQuery = async (query: string): Promise<void> => {
    await this.open();
    await this.db.exec(query);
    await this.close();
  };

  execute = async (
    query: string,
    ...params: any[]
  ): Promise<ISqlite.RunResult<sqlite3.Statement>> => {
    await this.open();
    const result = await this.db.run(query, params);
    await this.close();
    return result;
  };

  getSingle = async (query: string, ...params: any[]): Promise<any> => {
    await this.open();
    const result = await this.db.get(query, params);
    await this.close();
    return result;
  };

  getMany = async (query: string, ...params: any[]): Promise<any[]> => {
    await this.open();
    const result = await this.db.all(query, params);
    await this.close();
    return result;
  };
}

export default DataBase;
