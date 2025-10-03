import { Request, Response } from "express";
import { GetAllProjectUseCase } from "./GetAllProjectUseCase";

export class GetAllProjectController {

    constructor (
        private getAllProjectUseCase: GetAllProjectUseCase
    ) {}

    async handle (_request: Request, response: Response){
        
        try {
            const allProjects = await this.getAllProjectUseCase.execute();

            return response.status(200).json({
                data: allProjects
            });

        } catch (err) {
            if (err instanceof Error){
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                })
            }
        }
    }
}