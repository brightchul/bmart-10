import { Router, Request, Response } from "express";
import { APIResponse } from "../types/APIResponse";

import goodsDAO from "../daos/goods.dao";

const router = Router();

/**
 * @api {get} /api/recommend 대표 상품 컴포넌트 정보 반환
 * @apiName Recommend Goods
 * @apiGroup Recommend
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Object} data 대표 상품들의 묶음
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : {
 *          "menus" : string[],
 *          "recommends" : [
 *            {
 *              "title" : string,
 *              "goodsData" : Goods[]
 *            },
 *          ]
 *       }
 *     }
 */
router.get("/", async (request: Request, response: Response) => {
  const apiResponse: APIResponse = {
    success: true,
    data: {},
  };

  const result = await goodsDAO.getRecommends();

  apiResponse.success = true;
  apiResponse.data = {
    menus: result.map((cur) => cur.title),
    recommends: result,
  };

  response.status(200).send(apiResponse);
});

export default router;
