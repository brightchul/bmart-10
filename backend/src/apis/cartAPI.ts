import { Router, Request, Response } from "express";
import { APIResponse } from "../types/APIResponse";

import cartDao from "../daos/cart.dao";

const router = Router();

/**
 * @api {get} /api/cart 장바구니 목록 조회
 * @apiHeader {String} Authorization Users unique token.
 * @apiName Cart list
 * @apiGroup Cart
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Object[]} data 사용자 장바구니 목록
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : [
 *          "cartList" : []
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

router.get("/", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail) {
    response.status(404).send(apiResponse);

    return;
  }

  const result = await cartDao.getCartList(userEmail);
  apiResponse.success = true;
  apiResponse.data = {
    cartList: result,
  };

  response.status(200).send(apiResponse);
});

/**
 * @api {post} /api/cart 장바구니 목록 추가
 * @apiHeader {String} Authorization Users unique token.
 * @apiName Cart list
 * @apiGroup Cart
 *
 * @apiParam {String} good_id       상품 아이디.
 * @apiParam {String} amount        상품 개수.
 *
 * @apiSuccess {Boolean} success API 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true
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

router.post("/", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail || !request.body) {
    response.status(404).send(apiResponse);

    return;
  }

  const data = { ...request.body, email: userEmail };
  const result = await cartDao.createCartItem(data);
  apiResponse.success = result;

  response.status(200).send(apiResponse);
});

/**
 * @api {delete} /api/cart 장바구니 목록 삭제
 * @apiHeader {String} Authorization Users unique token.
 * @apiName Get Cart list
 * @apiGroup Cart
 *
 * @apiParam {String} list       삭제할상품 아이디 리스트.
 *
 * @apiSuccess {Boolean} success API 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true
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

router.delete("/", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const { list } = request.body;
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail || !request.body) {
    response.status(404).send(apiResponse);

    return;
  }

  const result = await cartDao.removeCartItem(list, userEmail);
  apiResponse.success = result;

  response.status(200).send(apiResponse);
});

/**
 * @api {put} /api/cart 장바구니 상풍 목록 개수 업데이트
 * @apiHeader {String} Authorization Users unique token.
 * @apiName Update Cart
 * @apiGroup Cart
 *
 * @apiParam {String} id       상품 아이디.
 * @apiParam {Number} amount        상품 개수.
 *
 * @apiSuccess {Boolean} success API 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true
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

router.patch("/", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail || !request.body) {
    response.status(404).send(apiResponse);

    return;
  }

  const data = { ...request.body, email: userEmail };

  await cartDao.updateCartItemAmount(data);
  apiResponse.success = true;

  response.status(200).send(apiResponse);
});

/**
 * @api {put} /api/cart/checked 장바구니 상품 체크 상태 변경
 * @apiHeader {String} Authorization Users unique token.
 * @apiName Update Cart
 * @apiGroup Cart
 *
 * @apiParam {String} id       상품 아이디.
 * @apiParam {String} checked        상품 체크 상태.
 *
 * @apiSuccess {Boolean} success API 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "success": true
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

router.patch("/checked", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail || !request.body) {
    response.status(404).send(apiResponse);

    return;
  }

  const data = { ...request.body, email: userEmail };

  const result = await cartDao.updateCartItemChecked(data);
  apiResponse.success = result;

  response.status(200).send(apiResponse);
});

router.patch("/checked/all", async (request: Request, response: Response) => {
  // 사용자 정보 받기
  const userEmail = "tmfrl002@naver.com";
  const { checked } = request.body;
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!userEmail || !request.body) {
    response.status(404).send(apiResponse);

    return;
  }

  const result = await cartDao.updateAllCartItemChecked(userEmail, checked);
  apiResponse.success = result;

  response.status(200).send(apiResponse);
});
export default router;
