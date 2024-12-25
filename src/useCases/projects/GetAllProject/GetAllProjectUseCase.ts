import { IProjectsRepository } from "../../../repositories/IProjectsRepository";

export class GetAllProjectUseCase {
    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute () {
        const allProjects = await this.projectsRepository.findAll();
        return allProjects;
    }
}