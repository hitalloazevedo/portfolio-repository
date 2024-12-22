import { Request, Response } from "express";
import { CreateProjectUseCase } from "./CreateProjectUseCase";

export class CreateProjectController {

    constructor (
        private createProjectUseCase: CreateProjectUseCase
    ) {}

    async handle (request: Request, response: Response): Promise<Response> {
        const {
            title,
            description,
            imageUrl,
            repoUrl,
            deployUrl,
            technologies
        } = request.body;

        try {
            await this.createProjectUseCase.execute({
                title,
                description,
                imageUrl,
                repoUrl,
                deployUrl,
                technologies
            })
    
            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }

    }
}