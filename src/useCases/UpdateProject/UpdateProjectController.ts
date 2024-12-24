import { Request, Response } from "express";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";

export class UpdateProjectController {

    constructor (
        private updateProjectUseCase: UpdateProjectUseCase
    ) {}

    async handle (request: Request, response: Response){
        try {

            const uuid: string = request.params.uuid.toString();
            const data = request.body;

            await this.updateProjectUseCase.execute(uuid, data);

            return response.status(200).send();
            
        } catch (err) {
            if (err instanceof Error){
                return response.status(400).json({
                    message: err.message || "Unexpected Error."
                })
            }
        }
    }
}