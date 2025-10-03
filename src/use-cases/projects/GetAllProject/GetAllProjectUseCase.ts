import { IProjectsRepository } from "../../../repositories/project.repository";

export class GetAllProjectUseCase {
    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute () {
        const allProjects = await this.projectsRepository.findAll();
        return allProjects;
    }
}