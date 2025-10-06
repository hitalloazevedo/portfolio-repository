import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../use-cases/auth.usecase";
import { Post } from "../routes/decorator";

export class AuthController {
    constructor (
        private useCase: AuthUseCase
    ) {}

    @Post('/login')
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