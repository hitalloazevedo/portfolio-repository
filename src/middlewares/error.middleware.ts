import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

export function errorHandler(
  error: Error | HttpError,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (error instanceof HttpError) {
    response.status(error.code).json({
      message: error.message,
    });
    return;
  }

  response.status(500).json({
    message: error.message,
  });
  return;
}