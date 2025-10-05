import { Response, Request, NextFunction } from "express";
import { ITokenService } from "../services/ITokenService";
import { AuthorizationError } from "../use-cases/errors/authorization.error";
import { TokenService } from "../services/implementations/jwt-token.service";

class AuthMiddleware {
    constructor (
        private tokenService: ITokenService
    ) {}

    guard () {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const token = request.headers.authorization?.split(' ')[1]
                if (!token) throw new AuthorizationError();
                
                this.tokenService.verifyToken(token);
                next();
    
            } catch (error) {
                next(error);
            }
        }
    }
}

export const authMiddleware = new AuthMiddleware(TokenService.getInstance());