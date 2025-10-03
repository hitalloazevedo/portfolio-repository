import { NextFunction, Request, Response } from "express";
import { MongoDBUsersRepository } from "../repositories/implementations/MongoDBUsersRepository";
import { UserUseCase } from "../use-cases/user.usecase";

class UserController {
    constructor (
        private useCase: UserUseCase
    ) {}

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

const mongoUsersRepository = new MongoDBUsersRepository();

const createUserUseCase = new UserUseCase(
    mongoUsersRepository
);

export const userController = new UserController(
    createUserUseCase
);
