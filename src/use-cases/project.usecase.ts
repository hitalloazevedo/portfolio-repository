import { SkillRepository } from "../repositories/skills.repository";
import { z } from 'zod';
import { AlreadyExistsError } from "./errors/already-exists.error";
import { svgToBase64 } from "../utils/svg-to-base64";
import { HttpError } from "./errors/http.error";
import { ProjectRepository } from "../repositories/project.repository";
import { CreateProjectDTO, projectSchema } from "../entities/project";

export class ProjectUseCase {
    constructor(
        private readonly repo: ProjectRepository
    ) { }

    async create(dto: CreateProjectDTO) {

        const project = await this.findByTitle(dto.title);

        if (project) throw new AlreadyExistsError('project already exists.');

        const parsed = projectSchema.parse(dto);
        await this.repo.save(parsed);
    }

    async findAll() {
        return await this.repo.findAll();
    }

    async findByTitle(title: string) {
        return await this.repo.findByTitle(title);
    }

    async deleteByTitle(title: string) {
        await this.repo.deleteByTitle(title);
    }
}

// export type CreateSkillRequestDTO = z.infer<typeof CreateSkillSchema>;
// export type CreateSkillDTO = {
//     title: string,
//     description: string,
//     base64Image: string
// };

// export const CreateSkillSchema = z.object({
//     title: z.string().min(1, "Title is required"),          // must be non-empty
//     description: z.string().min(1, "Description is required"), // must be non-empty
//     svgImage: z.string().min(1, "SVG image is required"),   // must be non-empty
// });