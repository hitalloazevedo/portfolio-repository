import { AuthMiddleware } from "./AuthMiddleware";
import { TokenService } from "../../services/implementations/TokenService";
import { NextFunction, Request, Response } from "express";

const tokenService = new TokenService();

const authMiddleware = new AuthMiddleware(
    tokenService
);

// abstraction for simplify it in the routes file
export function authMiddlewareController (request: Request, response: Response, next: NextFunction) {
    authMiddleware.handle(request, response, next);
}
