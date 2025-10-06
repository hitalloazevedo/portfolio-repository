import { AlreadyExistsError } from "./errors/already-exists.error";
import { CreateProjectDTO, projectSchema } from "../entities/project";
import { ProjectRepository } from '../repositories/interfaces/project.repository';
import { HttpError } from "./errors/http.error";

export class ProjectUseCase {
    constructor(
        private readonly repo: ProjectRepository
    ) { }

    async create(dto: CreateProjectDTO) {

        const project = await this.findByTitle(dto.title);

        if (project) throw new AlreadyExistsError('project already exists.');

        const parsed = projectSchema.parse(dto);
        await this.repo.save(parsed);
        console.log(`New project (${parsed.title}) created!`);
    }

    async findAll() {
        return await this.repo.findAll();
    }

    async findByTitle(title: string) {
        return await this.repo.findByTitle(title);
    }

    async deleteByTitle(title: string) {
        if (!title) throw new HttpError(400, "invalid input.", "a title must be provided.");
        await this.repo.deleteByTitle(title);
    }
}
