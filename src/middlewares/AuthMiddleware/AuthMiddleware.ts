import { Response, Request, NextFunction } from "express";
import { ITokenService } from "../../services/ITokenService";

export class AuthMiddleware {
    constructor (
        private tokenService: ITokenService
    ) {}

    handle (request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.split(' ')[1]

        try {

            if (!token) {
                throw new Error("No token provided.")
            }
            
            this.tokenService.verifyToken(token);

            next();

        } catch (err) {
            if (err instanceof Error) {
                console.error('Invalid token:', err.message);
                return response.status(401).json({ 
                    message: err.message || 'Invalid or expired token' 
                });
            }
        }
    }
}