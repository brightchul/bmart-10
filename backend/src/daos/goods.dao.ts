import mysql, { RowDataPacket } from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";

import { Goods } from "../types/dto/goods.dto";
import { Query } from "../util/query";

const CREATE_GOODS = `INSERT INTO goods (title, category_name, cost, discount, amount, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
const SEARCH_QUERY = `SELECT * FROM \`goods\` WHERE \`title\` LIKE (?)`;
const SELECT_GOODS =
  "SELECT good_id AS goodId ,title ,category_name AS categoryName ,created_at AS createdAt ,cost ,discount ,amount ,image_url AS imageUrl FROM goods WHERE good_id = ?";
const SEARCH_SUB_CATEGORY_LIST_FROM_MAIN = `SELECT name, sub_category_array as subCategories FROM main_category`;

const SEARCH_MAIN_CATEGORY_GOODS = `
  SELECT
    good_id, title, category_name, created_at, cost, discount, amount, image_url, delete_flag
  FROM goods 
  WHERE delete_flag = 0 AND category_name IN `;

const ORDER_BY_RANDOM = `ORDER BY RAND() LIMIT 4`;

const SELECT_NEW_GOODS = `select * from goods where delete_flag = 0 order by created_at desc`;
const SELECT_POPULAR_GOODS = `select * from goods where delete_flag = 0 order by order_cnt desc`;

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

type GoodsInfo = {
  goodId: number;
  title: string;
  categoryName: string;
  createdAt: Date;
  cost: number;
  discount: number;
  amount: number;
  imageUrl: string;
};
type Recommend = {
  title: string;
  goodsData: Goods[];
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

    const rows = (await this.executeQuery(connection, SEARCH_QUERY, [
      `%${query}%`,
    ])) as mysql.RowDataPacket[];

    if (rows instanceof Array) {
      rows.forEach((row: mysql.RowDataPacket) => {
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

  async getRecommends(): Promise<Recommend[]> {
    const result: Recommend[] = [];

    const connection = await this.getConnection();

    const mainCategoryInfos = (await this.executeQuery(
      connection,
      SEARCH_SUB_CATEGORY_LIST_FROM_MAIN,
      []
    )) as mysql.RowDataPacket[];

    for (const mainCategoryInfo of mainCategoryInfos) {
      const currentRow = mainCategoryInfo as {
        name: string;
        subCategories: string[];
      };

      const currentRecommend: Recommend = {
        title: currentRow.name,
        goodsData: [],
      };

      const currentSelectQuery = `${SEARCH_MAIN_CATEGORY_GOODS} ('${currentRow.subCategories.join(
        "', '"
      )}') ${ORDER_BY_RANDOM}`;

      const datas = await this.executeQuery(connection, currentSelectQuery, []);

      currentRecommend.goodsData = (datas as Row[]).map((data) => {
        return {
          id: data.good_id,
          name: data.title,
          categoryName: data.category_name,
          cost: data.cost,
          discount: data.discount,
          amount: data.amount,
          imageUrl: data.image_url,
        };
      });

      result.push(currentRecommend);
    }

    connection.release();
    return result;
  }
  async getGoodsInfo(goodId: string) {
    const result = (await this.execute(
      SELECT_GOODS,
      goodId
    )) as RowDataPacket[];
    return result;
  }
  async getInfo<T>(query: string, params: Array<string>): Promise<Array<T>> {
    const connection = await this.getConnection();
    const rows = await connection.execute<RowDataPacket[]>(query, params);
    connection.release();

    let result: Array<T> = [];

    if (rows[0] !== undefined) {
      result = JSON.parse(JSON.stringify(rows[0]));
    }
    return result;
  }
  async getNewGoods({
    startIdx,
    offset,
  }: {
    startIdx?: number;
    offset?: number;
  }) {
    const result = await this.getInfo(
      Query.of(SELECT_NEW_GOODS).limit(startIdx, offset).build(),
      []
    );
    return result;
  }
}

export default new GoodsDAO(poolOption);
