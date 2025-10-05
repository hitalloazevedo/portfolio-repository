import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../use-cases/auth.usecase";
import { MongoDBUsersRepository } from "../repositories/implementations/user.mongo";
import { TokenService } from "../services/implementations/jwt-token.service";

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

    async logout(){

    }
}

const mongoUsersRepository = new MongoDBUsersRepository();

const authenticateUserUseCase =  new AuthUseCase(
    mongoUsersRepository,
    TokenService.getInstance()
);

export const authController = new AuthController(
    authenticateUserUseCase
);