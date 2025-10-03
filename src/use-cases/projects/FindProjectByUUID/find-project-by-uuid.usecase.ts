import { IProjectsRepository } from "../../../repositories/project.repository";

export class FindProjectByUUIDUseCase {
    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute (uuid: string) {
        return await this.projectsRepository.findByUUID(uuid);
    }
}