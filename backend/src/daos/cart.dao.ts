import mysql from "mysql2/promise";
import DAO from "./data-access-object";
import poolOption from "./pool-option";
import { CartListItem, CartItem } from "../types/dto/cart.dto";

const GET_CART_ITEM_LIST = `SELECT
  good_id,
  cart.amount,
  cart.checked,
  title,
  category_name AS categoryName,
  discount,
  cost,
  image_url
from cart
JOIN goods
ON goods.good_id = cart.fk_good_id
WHERE fk_user_email = ?`;

const GET_CART_ITEM_BY_ID = `SELECT * FROM cart WHERE fk_good_id = ?`;
const CREATE_CART_ITEM = `INSERT INTO cart (fk_user_email, fk_good_id, amount, checked) VALUES (?, ?, ?, ?)`;
const UPDATE_CART_ITEM_AMOUNT_INCREASE = `UPDATE cart SET amount = amount + ? WHERE fk_user_email = ? AND fk_good_id = ?`;
const UPDATE_CART_ITEM_AMOUNT = `UPDATE cart SET amount = ? WHERE fk_user_email = ? AND fk_good_id = ?`;
const UPDATE_CART_ITEM_CHECKED = `UPDATE cart SET checked = ? WHERE fk_user_email = ? AND fk_good_id = ?`;
const UPDATE_ALL_CART_ITEM_CHECKED = `UPDATE cart SET checked = ? WHERE fk_user_email = ?`;
const DELETE_CART_ITEM = `DELETE FROM cart WHERE fk_user_email = ? AND fk_good_id IN `;

class CartDAO extends DAO {
  constructor(option: mysql.PoolOptions) {
    super(option);
  }

  async getCartList(email: string): Promise<CartListItem[]> {
    const connection = await this.getConnection();
    let result: CartListItem[] = [];

    try {
      await connection.beginTransaction();
      const rows = await this.executeQuery(connection, GET_CART_ITEM_LIST, [
        email,
      ]);
      if (rows instanceof Array) {
        rows.forEach((row: any, index: number) => {
          const curData: CartListItem = {
            id: row.good_id,
            title: row.title,
            cost: row.cost,
            discount: row.discount,
            amount: row.amount,
            imageUrl: row.image_url,
            checked: row.checked,
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
      const cartItemExist = await this.executeQuery(
        connection,
        GET_CART_ITEM_BY_ID,
        [id]
      );

      if (Array.isArray(cartItemExist)) {
        if (cartItemExist[0]) {
          await this.executeQuery(
            connection,
            UPDATE_CART_ITEM_AMOUNT_INCREASE,
            [`${amount}`, email, id]
          );
        } else {
          await this.executeQuery(connection, CREATE_CART_ITEM, [
            email,
            id,
            `${amount}`,
            "true",
          ]);
        }
      }
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

  async updateCartItemAmount(data: CartItem) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      const { id, email, amount } = data;
      await this.executeQuery(connection, UPDATE_CART_ITEM_AMOUNT, [
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

  async updateCartItemChecked(data: CartItem) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      const { id, email, checked } = data;
      await this.executeQuery(connection, UPDATE_CART_ITEM_CHECKED, [
        checked,
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

  async updateAllCartItemChecked(email: string, checked: string) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      await this.executeQuery(connection, UPDATE_ALL_CART_ITEM_CHECKED, [
        checked,
        email,
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

  async removeCartItem(list: string, email: string) {
    const connection = await this.getConnection();
    let result = false;
    try {
      await connection.beginTransaction();
      let goodItemLength = "";
      const removeList = list.split(",");
      removeList.forEach((item: string, index) => {
        goodItemLength += index === removeList.length - 1 ? "?" : "?,";
      });
      await this.executeQuery(
        connection,
        DELETE_CART_ITEM + `(${goodItemLength})`,
        [email, ...removeList]
      );

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
