import csv from "csv-parser";
import fs from "fs";
import goodsDAO from "../daos/goods.dao";

import { Goods } from "../types/dto/goods.dto";

type Row = {
  big_category: string;
  category_name: string;
  name: string;
  cost: string;
  image_url: string;
};
export default function Run() {
  
  fs.createReadStream("./src/util/data/output.csv")
  .pipe(csv())
  .on("data", (row: Row) => {
    const data: Goods = {
      name: row.name,
      categoryName: row.category_name,
      cost: parseInt(row.cost.replace(",", "")),
      discount: Math.round(Math.random() * 10) * 5,
      amount: 1000,
      imageUrl: row.image_url,
    };
    
    goodsDAO.createGoods(data);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
}
  