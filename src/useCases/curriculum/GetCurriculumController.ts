import { Request, Response } from "express";
import { File } from "../../entities/File";
import { GetCurriculumUseCase } from "./GetCurriculumUseCase";

export class GetCurriculumController {
    constructor (
        private getCurriculumUseCase: GetCurriculumUseCase
    ){}

    async handle(request: Request, response: Response){
        try {

            const curriculum: File = await this.getCurriculumUseCase.execute("hitallo-azevedo-curriculum.pdf");

            return response.status(200).download(curriculum.filePath, curriculum.fileName, (err) => {
                if (err){
                    console.error('Erro while downloading file:', err);
                    response.status(500).send('Error during download processing');
                }
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