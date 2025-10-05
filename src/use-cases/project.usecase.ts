import { SkillRepository } from "../repositories/skills.repository";
import { z } from 'zod';
import { AlreadyExistsError } from "./errors/already-exists.error";
import { svgToBase64 } from "../utils/svg-to-base64";
import { HttpError } from "./errors/http.error";

export class ProjectUseCase {
    constructor(
        private readonly repo: SkillRepository
    ) { }

    async create(dto: null) {
    }

    async findAll() {
        return await this.repo.findAll();
    }

    async deleteByTitle(title: string) {
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