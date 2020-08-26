import mysql, { RowDataPacket } from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";

import {
  getEncryptedPasswordAndSalt,
  getEncryptedPasswordWithSalt,
} from "../util/encryptPassword";

const CREATE_USER = `
    INSERT INTO users (email, user_name, password, salt) 
    VALUES (?, ?, ?, ?)`;

const SEARCH_USER_NAME_SALT_PWD = `
    SELECT user_name as name, salt, password 
    FROM users WHERE email = ?
`;

const SEARCH_USER_INFO = `
  SELECT email, user_name AS name, type, delete_flag AS deleteFlag, vip_flag AS vipFlag, wish_array AS wishArray
  FROM users WHERE email = ?
`;

class UserDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async insertTransaction(query: string, params: Array<string>) {
    const connection = await this.getConnection();
    let result = false;

    try {
      await connection.beginTransaction();
      await this.executeQuery(connection, query, params);
      result = true;
      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }
    return result;
  }

  async getOneInfo(query: string, params: Array<string>) {
    const connection = await this.getConnection();
    const rows = await connection.execute<RowDataPacket[]>(query, params);
    const result = rows[0][0];
    return result;
  }

  async createUser(
    email: string,
    userName: string,
    password: string
  ): Promise<boolean> {
    const { encryptedPassword, salt } = await getEncryptedPasswordAndSalt(
      password
    );
    const params = [email, userName, encryptedPassword, salt];
    return await this.insertTransaction(CREATE_USER, params);
  }

  async loginUser(email: string, password: string) {
    const result: RowDataPacket = await this.getOneInfo(
      SEARCH_USER_NAME_SALT_PWD,
      [email]
    );
    if (!result) return false;

    const encryptedPassword = await getEncryptedPasswordWithSalt(
      password,
      result.salt
    );
    if (result.password !== encryptedPassword) return false;

    return { name: result.name, email };
  }
  async getUserByEmail(email: string) {
    const result = await this.getOneInfo(SEARCH_USER_INFO, [email]);
    return result;
  }
}

export default new UserDAO(poolOption);
