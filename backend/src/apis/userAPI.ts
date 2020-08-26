import { Router, Request, Response, NextFunction } from "express";
import { APIResponse } from "../types/APIResponse";
import jwt from "jsonwebtoken";
import passport from "passport";
import userDAO from "../daos/user.dao";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
/**
 * @api {post} /api/user/register 상품 이름으로 검색
 * @apiName UserSignup
 * @apiGroup User
 *
 * @apiParam {String} email name password
 *
 * @apiSuccess {Boolean} success API 성공 여부
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError NotFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "success": false,
 *     }
 */
router.post("/register", async (request: Request, response: Response) => {
  const { email, name: userName, password } = request.body;

  const apiResponse: APIResponse = { success: false };

  if (!email || !userName || !password) {
    response.status(409).send(apiResponse);
    return;
  }

  const result = await userDAO.createUser(email, userName, password);
  apiResponse.success = result;
  response.status(result ? 200 : 409).send(apiResponse);
});

/**
 * @api {post} /api/user/login 상품 이름으로 검색
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Object} data name token 포함된 객체
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data" : {
 *          "token" : "token_value",
 *          "name" : "name"
 *       }
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
router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    let success = false;
    await passport.authenticate("local", { session: false }, (err, data) => {
      if (err || !data) {
        return response.status(400).json({ success });
      }

      request.login(data, { session: false }, (err) => {
        if (err) {
          response.send(err);
        }
        success = true;
        const plainObj = JSON.parse(JSON.stringify(data));
        data.token = jwt.sign(plainObj, process.env.JWT_SECRET!);
        return response.json({ success, data });
      });
    })(request, response);
  }
);

/**
 * @api {get} /api/user/email/:email 이메일 중복 여부 확인
 * @apiName UserEmailCheck
 * @apiGroup User
 *
 * @apiParam {String} email
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Boolean} isUserEmail 포함된 객체
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "isUserEmail": true || false
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
router.get("/email/:email", async (request: Request, response: Response) => {
  const email = request.params.email.trim();
  const apiResponse: APIResponse = {
    success: false,
  };

  if (!email) {
    return response.status(404).send(apiResponse);
  }

  const result = await userDAO.getUserByEmail(email);
  apiResponse.success = true;
  apiResponse.isUserEmail = result !== undefined;

  response.status(200).send(apiResponse);
});

/**
 * @api {post} /api/user/test user test url
 * @apiName UserTest
 * @apiGroup User
 *
 * @apiHeader {string} Content-Type application/json
 * @apiHeader {string} Authorization Bearer tokenText
 *
 * @apiSuccess {Boolean} success API 성공 여부
 * @apiSuccess {Object} data name token 포함된 객체
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email":
 *       "name":
 *       "type":
 *       "deleteFlag":
 *       "vipFlag":
 *       "wishArray":
 *     }
 *
 * @apiError Unauthorized
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 */
router.get("/test", passport.authenticate("jwt", { session: false }), function (
  request: Request,
  response: Response
) {
  const user = request.user;
  response.json(user);
});

export default router;
