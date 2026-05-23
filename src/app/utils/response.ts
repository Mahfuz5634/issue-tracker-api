import type { Response } from "express";

interface SuccessResponseOptions<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}

interface ErrorResponseOptions {
  statusCode?: number;
  message: string;
}

export const sendSuccessResponse = <T>(
  res: Response,
  options: SuccessResponseOptions<T>,
) => {
  const { statusCode = 200, message, data } = options;

  const responseBody: {
    success: true;
    message?: string;
    data?: T;
  } = {
    success: true,
  };

  if (message) {
    responseBody.message = message;
  }

  if (data !== undefined) {
    responseBody.data = data;
  }

  return res.status(statusCode).json(responseBody);
};

export const sendErrorResponse = (
  res: Response,
  options: ErrorResponseOptions,
) => {
  const { statusCode = 400, message } = options;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
