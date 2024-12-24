import { Project } from "../../entities/Project";
import { IProjectsRepository } from "../../repositories/IProjectsRepository";
import { ICreateProjectRequestDTO } from "./CreateProjectDTO";

export class CreateProjectUseCase {

    // private projectsRepository: IUsersRepository;

    // constructor (
    //     projectsRepository: IUsersRepository
    // ) {
    //     this.projectsRepository = projectsRepository;
    // }

    // The code bellow do the same thing of the code above

    constructor (
        private projectsRepository: IProjectsRepository
    ) {}

    async execute(data: ICreateProjectRequestDTO) {
        const projectAlreadyExists = await this.projectsRepository.findByTitle(data.title);

        if (projectAlreadyExists){
            throw new Error("Project already exists.");
        }

        const project = new Project(data);

        await this.projectsRepository.save(project);
    }
}