import { NextFunction, Request, Response } from "express";
import { UserUseCase } from "../use-cases/user.usecase";
import { Post } from "../routes/decorator";

export class UserController {
    constructor (
        private useCase: UserUseCase
    ) {}

    @Post('/signup')
    async create(request: Request, response: Response, next: NextFunction) {
        
        try {
            const dto = request.body;
            await this.useCase.create(dto);
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    }
}