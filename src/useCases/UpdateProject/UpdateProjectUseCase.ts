import { IProjectsRepository } from "../../repositories/IProjectsRepository";
import { IUpdateProjectRequestDTO } from "./UpdateProjectDTO";

export class UpdateProjectUseCase {

    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute(uuid: string, data: Partial<IUpdateProjectRequestDTO>){
        const _id = await this.projectsRepository.getIdbyUuid(uuid);
        await this.projectsRepository.update(_id, data);     
    }
}