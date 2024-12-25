import { CreateSkillUseCase } from "./CreateSkillUseCase";
import { Request, Response } from "express";

export class CreateSkillController {
    constructor (
        private createSkillUseCase: CreateSkillUseCase
    ) {}

    async handle(request: Request, response: Response) {
        const { title, description, svg_image } = request.body;

        try {
            await this.createSkillUseCase.execute({ title, description, svg_image})
    
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