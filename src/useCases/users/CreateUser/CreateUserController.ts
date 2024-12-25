import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor (
        private createUserUseCase: CreateUserUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const newUserData = request.body;

        try {
            await this.createUserUseCase.execute(newUserData)
    
            return response.status(201).send();
        } catch (err) {
            if (err instanceof Error){
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                });
            }
        }
    }
}