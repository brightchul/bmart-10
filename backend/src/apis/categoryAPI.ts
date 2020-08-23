import { Router, Request, Response } from "express";
import { APIResponse } from "../types/APIResponse";

import categoryDAO from "../daos/category.dao";

const router = Router();

/**
 * 숫자가 request query로 넘어올때만 값을 넘기고 그외에는 undefined로 받도록 하기 위해서 만듬.
 * 원래는 parseInt(value) || undefined로 하려했으나 '0'의 경우 처리가 안되고 undefined로 넘어가서 그것을 막기위함.
 *
 * @param {string} value 파싱할 값
 */
const parseRequestQueryToInt = (value?: string): number | undefined => {
  const result = parseInt(value as string);
  if (Number.isNaN(result)) return undefined;
  return result;
};

/**
 * @api {get} /api/category/list/:main 상품 이름으로 검색
 * @apiName CategoryList by main
 * @apiGroup Category
 *
 * @apiParam {String} main
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Array} data 해당 메인 카테고리의 서브 카테고리 정보들
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : [
 *          {"name": string, "no": number}
 *       ]
 *     }
 *
 * @apiError NotFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *     }
 */
router.get("/list/:main", async (request: Request, response: Response) => {
  const { main } = request.params;
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!main) {
    return response.status(404).send(apiResponse);
  }

  const result = await categoryDAO.getSubCategoryNameList(main);
  if (!result) {
    return response.status(404).send(apiResponse);
  }
  const subCategoryInfoArr = await Promise.all(
    result.data.map((one) => categoryDAO.getSubCategoryInfo(one))
  );

  apiResponse.success = true;
  apiResponse.data = [...subCategoryInfoArr];
  response.status(200).send(apiResponse);
});

/**
 * @api {get} /api/category/goods/:main 메인 카테고리 이름으로 상품을 가져온다.
 * @apiName GoodsInMainCategory by main
 * @apiGroup Category
 *
 * @apiParam {String} main
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Array} data 해당 메인 카테고리의 상품 정보 배열
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : [
 *           {"goodId": number, "title": string, "price": string, "sale": string, "src": string}
 *       ]
 *     }
 *
 * @apiError NotFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *     }
 */
router.get("/goods/:main", async (request: Request, response: Response) => {
  const startIdx = parseRequestQueryToInt(request.query.startIdx as string);
  const offset = parseRequestQueryToInt(request.query.offset as string);

  const { main } = request.params;
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!main) {
    return response.status(404).send(apiResponse);
  }

  const result = await categoryDAO.getSubCategoryNameList(main);
  if (!result) {
    return response.status(404).send(apiResponse);
  }
  const goods = await categoryDAO.getGoodsInMainCategory(
    result.data,
    startIdx,
    offset
  );

  apiResponse.success = true;
  apiResponse.data = goods;
  response.status(200).send(apiResponse);
});

/**
 * @api {get} /api/category/goods/:main/:sub 메인 카테고리 이름으로 상품을 가져온다.
 * @apiName GoodsInSubCategory by sub
 * @apiGroup Category
 *
 * @apiParam {String} main
 * @apiParam {String} sub
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Array} data 해당 메인 카테고리의 상품 정보 배열
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : [
 *           {"goodId": number, "title": string, "price": string, "sale": string, "src": string}
 *       ]
 *     }
 *
 * @apiError NotFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *     }
 */
router.get(
  "/goods/:main/:subCategoryNo",
  async (request: Request, response: Response) => {
    const startIdx = parseRequestQueryToInt(request.query.startIdx as string);
    const offset = parseRequestQueryToInt(request.query.offset as string);

    // sub가 sub_category테이블의 컬럼 no 이다.
    const { main, subCategoryNo } = request.params;
    const apiResponse: APIResponse = {
      success: false,
    };

    if (!main || !subCategoryNo) {
      return response.status(404).send(apiResponse);
    }

    // sub로 보내온 값이 main에 속해 있는 카테고리 값인지 확인해야 함
    const subCategoryName = await categoryDAO.getSubCategoryName(subCategoryNo);
    const result = await categoryDAO.getSubCategoryNameList(main);

    if (!result || !subCategoryName || !result.data.includes(subCategoryName)) {
      return response.status(404).send(apiResponse);
    }

    const goods = await categoryDAO.getGoodsInSubCategory(
      subCategoryName,
      startIdx,
      offset
    );

    apiResponse.success = true;
    apiResponse.data = goods;
    response.status(200).send(apiResponse);
  }
);
export default router;
