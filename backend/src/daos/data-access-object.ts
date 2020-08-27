import mysql from "mysql2/promise";

class DataAccessObject {
  pool: mysql.Pool;

  constructor(option: mysql.PoolOptions) {
    this.pool = mysql.createPool(option);
  }

  async getConnection(): Promise<mysql.PoolConnection> {
    return await this.pool.getConnection();
  }

  endPool(): void {
    this.pool.end();
  }

  async executeQuery(
    connection: mysql.PoolConnection,
    sql: string,
    preparedStatement: string[]
  ): Promise<
    | mysql.RowDataPacket[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket
    | mysql.OkPacket[]
    | mysql.ResultSetHeader
  > {
    const execute = await connection.execute(sql, preparedStatement);
    return execute[0];
  }
  async execute(
    sql: string,
    ...preparedStatement: string[]
  ): Promise<
    | mysql.RowDataPacket[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket
    | mysql.OkPacket[]
    | mysql.ResultSetHeader
  > {
    const execute = await this.pool.execute(sql, preparedStatement);
    return execute[0];
  }

  async isConnectSuccess(): Promise<boolean> {
    let result = false;
    try {
      const connection = await this.getConnection();
      result = true;
      connection.release();
    } catch (error) {
      result = false;
    }

    return result;
  }
}

export default DataAccessObject;
