import { IProjectsRepository } from "../../../repositories/project.repository";

export class DeleteProjectUseCase {
    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute(uuid: string){
        const _id = await this.projectsRepository.getIdbyUuid(uuid);
        await this.projectsRepository.delete(_id);
    }
}