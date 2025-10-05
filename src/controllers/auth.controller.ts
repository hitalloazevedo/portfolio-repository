import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../use-cases/auth.usecase";
import { MongoDBUsersRepository } from "../repositories/implementations/user.mongo";
import { JwtTokenService } from "../infra/jwt-token.service";

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

export const authController = new AuthController(
    new AuthUseCase(
        new MongoDBUsersRepository(),
        JwtTokenService.getInstance()
    )
);