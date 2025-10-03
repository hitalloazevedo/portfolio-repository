import { GetAllSkillsUseCase } from "./GetAllSkillsUseCase";
import { Request, Response } from "express";

export class GetAllSkillsController {
    constructor (
        private getAllSkillsUseCase: GetAllSkillsUseCase
    ) {}

    async handle(request: Request, response: Response) {
        
        try {

            const skills = await this.getAllSkillsUseCase.execute()
    
            return response.status(200).json({
                data: skills
            });

        } catch (err) {
            if (err instanceof Error){
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                });
            }
        }
    }
}