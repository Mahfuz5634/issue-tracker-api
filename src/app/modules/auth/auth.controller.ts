import type { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { AuthService } from "./auth.service";
import { loginSchema, signupSchema } from "./auth.validate";


export const AuthController = {
  async signup(req: Request, res: Response) {
    try {
      const validatedData = signupSchema.parse(req.body);
      const user = await AuthService.signup(validatedData);

      return sendSuccessResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 400,
        message: error.message,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await AuthService.login(validatedData);

      return sendSuccessResponse(res, {
        statusCode: 200,
        message: "Login successfully",
        data: result,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 401,
        message: error.message,
      });
    }
  },
};
