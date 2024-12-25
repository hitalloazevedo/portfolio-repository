import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    constructor (
        private authenticateUserUseCase: AuthenticateUserUseCase
    ) {}

    async handle (request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;

        try {

            const token: string = await this.authenticateUserUseCase.execute({ email, password })
    
            return response.status(200).setHeader('Authorization', `Bearer ${token}`).send();

        } catch (err) {
            if (err instanceof Error){
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                });
            }
        }
    }
}