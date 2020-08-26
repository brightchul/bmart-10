import mysql from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";
import { CartListItem, UserCartList, CartItem } from '../types/dto/cart.dto';

const GET_CART_LIST = `SELECT * FROM cart WHERE fk_user_email = ?`;
const GET_GOODS_ITEM = `SELECT * FROM goods WHERE good_id IN `;
const CREATE_CART_ITEM = `INSERT INTO cart (fk_user_email, fk_good_id, amount) VALUES (?, ?, ?)`;
const UPDATE_CART_ITEM = `UPDATE cart SET amount = ? WHERE fk_user_email = ? AND fk_good_id = ?`;
const DELETE_CART_ITEM = `DELETE FROM cart WHERE fk_user_email = ? AND fk_good_id = ?`;

class CartDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getCartList(email: string): Promise<CartListItem[]> {
    const connection = await this.getConnection();
    let result: CartListItem[] = [];

    try {
      await connection.beginTransaction();

      let userCartList: UserCartList[] = [];
      let cartItemIdList: string[] = [];
      let goodItemLength = "";
      const rows = await this.executeQuery(connection, GET_CART_LIST, [email]);

      if (rows instanceof Array) {
        rows.forEach((row: any, index: number) => {
          const curData: UserCartList = {
            id: row.fk_good_id,
            amount: row.amount,
          };
          userCartList = userCartList.concat(curData);
          goodItemLength += index === rows.length - 1 ? "?" : "?,";
          cartItemIdList = cartItemIdList.concat(row.fk_good_id);
        });
      }

      const cartItemRows = await this.executeQuery(
        connection,
        GET_GOODS_ITEM + `(${goodItemLength})`,
        cartItemIdList
      );

      if (cartItemRows instanceof Array) {
        cartItemRows.forEach((row: any) => {
          const findCartItem = userCartList.find(
            (item) => item.id === row.good_id
          );
          const curData: CartListItem = {
            id: row.good_id,
            title: row.title,
            cost: row.cost,
            discount: row.discount,
            amount: findCartItem?.amount || 1,
            image_url: row.image_url,
          };
          result = result.concat(curData);
        });
      }

      await connection.commit();
    } catch (error) {
      console.log(error);
      connection.rollback();
    } finally {
      connection.release();
    }
    return result;
  }

  async createCartItem(data: CartItem) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      const { id, email, amount } = data;
      await this.executeQuery(connection, CREATE_CART_ITEM, [
        email,
        id,
        `${amount}`,
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

  async updateCartItem(data: CartItem) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      const { id, email, amount } = data;
      await this.executeQuery(connection, UPDATE_CART_ITEM, [
        `${amount}`,
        email,
        id,
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

  async removeCartItem(id: string, email: string) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      await this.executeQuery(connection, DELETE_CART_ITEM, [email, id]);

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
}

export default new CartDAO(poolOption);
