import { IProjectsRepository } from "../../../repositories/IProjectsRepository";

export class FindProjectByUUIDUseCase {
    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute (uuid: string) {
        return await this.projectsRepository.findByUUID(uuid);
    }
}