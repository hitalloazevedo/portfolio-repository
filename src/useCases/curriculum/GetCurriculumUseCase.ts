import { File } from "../../entities/File";
import { ICurriculumRepository } from "../../repositories/ICurriculumRepository";

export class GetCurriculumUseCase {

    constructor(
        private curriculumRepository: ICurriculumRepository
    ){}

    async execute(fileName: string){
        return await this.curriculumRepository.get(fileName);
    }
}