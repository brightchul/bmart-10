import mysql, { RowDataPacket } from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";
import { Query } from "../util/query";

const SEARCH_SUB_CATEGORY_INFO = `SELECT no, name FROM sub_category WHERE name = ? `;
const SEARCH_SUB_CATEGORY_NAME_LIST = `SELECT name, sub_category_array as data FROM main_category WHERE name = ? `;
const SEARCH_SUB_CATEGORY_NAME = `SELECT name FROM sub_category where no=?`;

const SEARCH_MAIN_CATEGORY_GOODS = `
  SELECT
    good_id AS goodId, title, category_name AS categoryName,
    created_at AS createdAt, cost, discount, amount,
    image_url AS imageUrl, order_cnt AS orderCnt
  FROM goods 
  WHERE delete_flag = 0 AND category_name IN `;

const SEARCH_SUB_CATEGORY_GOODS = `
  SELECT
    good_id AS goodId, title, category_name AS categoryName,
    created_at AS createdAt, cost, discount, amount,
    image_url AS imageUrl, order_cnt AS orderCnt
  FROM goods 
  WHERE delete_flag = 0 AND category_name = ?`;

type SubCategoryNameList = {
  name: string;
  data: Array<string>;
};

type SubCategoryInfo =
  | {
      no: number;
      name: string;
    }
  | undefined;

class CategoryDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getOneInfo<T>(
    query: string,
    params: Array<string>
  ): Promise<T | undefined> {
    const connection = await this.getConnection();
    const rows = await connection.execute<RowDataPacket[]>(query, params);
    connection.release();

    let result: T | undefined = undefined;

    // 그냥 반환하면 RowDataPacket[] 타입이 되기 때문에 해당 타입을 일반 배열, 객체로 변경해준다.
    if (rows[0][0] !== undefined) {
      result = JSON.parse(JSON.stringify(rows[0][0]));
    }
    return result;
  }
  async getInfo<T>(query: string, params: Array<string>): Promise<Array<T>> {
    const connection = await this.getConnection();
    const rows = await connection.execute<RowDataPacket[]>(query, params);
    connection.release();

    let result: Array<T> = [];

    // 그냥 반환하면 RowDataPacket[] 타입이 되기 때문에 해당 타입을 일반 배열, 객체로 변경해준다.
    if (rows[0] !== undefined) {
      result = JSON.parse(JSON.stringify(rows[0]));
    }
    return result;
  }
  async getSubCategoryNameList(
    mainName: string
  ): Promise<SubCategoryNameList | undefined> {
    const result = await this.getOneInfo<SubCategoryNameList>(
      SEARCH_SUB_CATEGORY_NAME_LIST,
      [mainName]
    );
    return result;
  }
  async getSubCategoryInfo(name: string): Promise<SubCategoryInfo> {
    const result: SubCategoryInfo = await this.getOneInfo<SubCategoryInfo>(
      SEARCH_SUB_CATEGORY_INFO,
      [name]
    );
    return result;
  }
  async getGoodsInMainCategory(
    subCategoryArr: Array<string>,
    startIdx?: number,
    offset?: number
  ) {
    const result = await this.getInfo(
      Query.of(SEARCH_MAIN_CATEGORY_GOODS)
        .placeHolder(subCategoryArr.length)
        .limit(startIdx, offset)
        .build(),
      subCategoryArr
    );
    return result;
  }
  async getSubCategoryName(subNo: string) {
    const result = await this.getOneInfo<{ name: string }>(
      SEARCH_SUB_CATEGORY_NAME,
      [subNo]
    );
    return result?.name;
  }
  async getGoodsInSubCategory(
    subCategoryName: string,
    startIdx?: number,
    offset?: number
  ) {
    const result = await this.getInfo(
      Query.of(SEARCH_SUB_CATEGORY_GOODS).limit(startIdx, offset).build(),
      [subCategoryName]
    );
    return result;
  }
}

export default new CategoryDAO(poolOption);
