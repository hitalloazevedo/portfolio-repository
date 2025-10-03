import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../use-cases/auth.usecase";
import { MongoDBUsersRepository } from "../repositories/implementations/MongoDBUsersRepository";
import { TokenService } from "../services/implementations/TokenService";

class AuthController {
    constructor (
        private useCase: AuthUseCase
    ) {}

    async login(request: Request, response: Response, next: NextFunction) {
        
        try {
            
            const dto = request.body;
            const token = await this.useCase.login(dto);
            return response.status(200).header('Authorization', `Bearer ${token}`).send();

        } catch (error) {
            next(error);
        }
    }

    async guard(request: Request, response: Response, next: NextFunction) {
        
    }
}

const mongoUsersRepository = new MongoDBUsersRepository();
const tokenService = new TokenService();

const authenticateUserUseCase =  new AuthUseCase(
    mongoUsersRepository,
    tokenService
);

export const authController = new AuthController(
    authenticateUserUseCase
);