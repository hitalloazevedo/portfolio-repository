import { Request, Response } from "express";
import { FindProjectByUUIDUseCase } from "./find-project-by-uuid.usecase";

export class FindProjectByUUIDController {

    constructor (
        private useCase: FindProjectByUUIDUseCase
    ) {}

    async handle (_request: Request, response: Response){

        const uuid = _request.params.uuid;

        if (!uuid){
            return response.status(400).json({ message: "uuid not informed" });
        }
        
        try {
            const project = await this.useCase.execute(uuid);

            return response.status(200).json({
                data: project
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