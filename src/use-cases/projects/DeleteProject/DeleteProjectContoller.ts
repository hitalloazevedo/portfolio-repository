import { Request, Response } from "express";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

export class DeleteProjectController {
    constructor (
        private deleteProjectUseCase: DeleteProjectUseCase
    ) {}

    async handle(request: Request, response: Response){
        try {

            const uuid: string = request.params.uuid.toString();

            await this.deleteProjectUseCase.execute(uuid);
            
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