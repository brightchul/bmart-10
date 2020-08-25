import mysql from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";

import { Goods } from "../types/dto/goods.dto";

const CREATE_GOODS = `INSERT INTO goods (title, category_name, cost, discount, amount, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
const SEARCH_QUERY = `SELECT * FROM \`goods\` WHERE \`title\` LIKE (?)`;

type Row = {
  good_id: number;
  title: string;
  category_name: string;
  created_at: Date;
  cost: number;
  discount: number;
  amount: number;
  image_url: string;
  delete_flag: boolean;
};

class GoodsDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async createGoods({
    name,
    categoryName,
    cost,
    discount,
    amount,
    imageUrl,
  }: Goods) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      await this.executeQuery(connection, CREATE_GOODS, [
        name,
        categoryName,
        `${cost}`,
        `${discount}`,
        `${amount}`,
        imageUrl,
      ]);

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

  async search(query: string): Promise<Goods[]> {
    const connection = await this.getConnection();
    const result: Goods[] = [];

    const rows = await this.executeQuery(connection, SEARCH_QUERY, [
      `%${query}%`,
    ]);

    if (rows instanceof Array) {
      rows.forEach((row: any) => {
        const inner = row as Row;

        const curData: Goods = {
          id: inner.good_id,
          name: inner.title,
          categoryName: inner.category_name,
          cost: inner.cost,
          discount: inner.discount,
          amount: inner.amount,
          imageUrl: inner.image_url,
        };

        result.push(curData);
      });
    }

    connection.release();

    return result;
  }
}

export default new GoodsDAO(poolOption);
