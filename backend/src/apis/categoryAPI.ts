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
 * @api {get} /api/category/list/:mainCategoryName 메인 카테고리 이름으로 서브카테고리 정보를 가져온다.
 * @apiName CategoryList by mainCategoryName
 * @apiGroup Category
 *
 * @apiParam {String} mainCategoryName
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
router.get(
  "/list/:mainCategoryName",
  async (request: Request, response: Response) => {
    const { mainCategoryName } = request.params;
    const apiResponse: APIResponse = {
      success: false,
    };

    if (!mainCategoryName) {
      return response.status(404).send(apiResponse);
    }

    const result = await categoryDAO.getSubCategoryNameList(mainCategoryName);
    if (!result) {
      return response.status(404).send(apiResponse);
    }
    const subCategoryInfoArr = await Promise.all(
      result.data.map((one) => categoryDAO.getSubCategoryInfo(one))
    );

    apiResponse.success = true;
    apiResponse.data = [...subCategoryInfoArr];
    response.status(200).send(apiResponse);
  }
);

/**
 * @api {get} /api/category/info/subcategory/:subCategoryNo 메인 카테고리 이름으로 서브카테고리 정보를 가져온다.
 * @apiName subCategoryInfo by subCategoryNo
 * @apiGroup Category
 *
 * @apiParam {String} subCategoryNo
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Object} data 서브카테고리 정보들
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : {"name": string, "no": number}
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
  "/info/subcategory/:subCategoryNo",
  async (request: Request, response: Response) => {
    const { subCategoryNo } = request.params;
    const apiResponse: APIResponse = {
      success: false,
    };

    if (!subCategoryNo) {
      return response.status(404).send(apiResponse);
    }

    const subCategoryInfo = await categoryDAO.getSubCategoryInfoByNo(
      subCategoryNo
    );

    apiResponse.success = true;
    apiResponse.data = subCategoryInfo;
    response.status(200).send(apiResponse);
  }
);

/**
 * @api {get} /api/category/goods/:mainCategoryName 메인 카테고리 이름으로 상품을 가져온다.
 * @apiName GoodsInMainCategory by mainCategoryName
 * @apiGroup Category
 *
 * @apiParam {String} mainCategoryName 메인카테고리 이름(한글)
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
  "/goods/:mainCategoryName",
  async (request: Request, response: Response) => {
    const startIdx = parseRequestQueryToInt(request.query.startIdx as string);
    const offset = parseRequestQueryToInt(request.query.offset as string);

    const { mainCategoryName } = request.params;
    const apiResponse: APIResponse = {
      success: false,
    };

    if (!mainCategoryName) {
      return response.status(404).send(apiResponse);
    }

    const result = await categoryDAO.getSubCategoryNameList(mainCategoryName);
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
  }
);

/**
 * @api {get} /api/category/goods/:mainCategoryName/:subCategoryNo 서브 카테고리 no으로 상품을 가져온다.
 * @apiName GoodsInSubCategory by sub
 * @apiGroup Category
 *
 * @apiParam {String} mainCategoryName 메인카테고리이름
 * @apiParam {String} subCategoryNo 서브 카테고리 번호
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
  "/goods/:mainCategoryName/:subCategoryNo",
  async (request: Request, response: Response) => {
    const startIdx = parseRequestQueryToInt(request.query.startIdx as string);
    const offset = parseRequestQueryToInt(request.query.offset as string);

    // sub가 sub_category테이블의 컬럼 no 이다.
    const { mainCategoryName, subCategoryNo } = request.params;
    const apiResponse: APIResponse = {
      success: false,
    };

    if (!mainCategoryName || !subCategoryNo) {
      return response.status(404).send(apiResponse);
    }

    // sub로 보내온 값이 main에 속해 있는 카테고리 값인지 확인해야 함
    const result = await categoryDAO.getSubCategoryNameList(mainCategoryName);
    const subCategoryName = await categoryDAO.getSubCategoryName(subCategoryNo);

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
