import { Request, Response } from "express";
import { UpdateSkillUseCase } from "./UpdateSkillUseCase";

export class UpdateSkillController {
    constructor (
        private updateSkillsUseCase: UpdateSkillUseCase
    ) {}

    async handle(request: Request, response: Response) {
        try {

            const uuid: string = request.params.uuid.toString();
            const { title, description, svg_image } = request.body;

            await this.updateSkillsUseCase.execute(uuid, { title, description, svg_image});

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