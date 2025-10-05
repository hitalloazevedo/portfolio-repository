import { Response, Request, NextFunction } from "express";
import { AuthorizationError } from "../use-cases/errors/authorization.error";
import { JwtTokenService } from "../services/jwt-token.service";

class AuthMiddleware {
    constructor (
        private jwtservice: JwtTokenService
    ) {}

    guard () {
        return async (request: Request, _: Response, next: NextFunction) => {
            try {
                const token = request.headers.authorization?.split(' ')[1]
                if (!token) throw new AuthorizationError();
                
                this.jwtservice.verifyToken(token);
                next();
    
            } catch (error) {
                next(error);
            }
        }
    }
}

export const authMiddleware = new AuthMiddleware(JwtTokenService.getInstance());