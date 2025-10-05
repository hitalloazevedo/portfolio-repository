import { SkillRepository } from "../repositories/skills.repository";
import { z } from 'zod';
import { AlreadyExistsError } from "./errors/already-exists.error";
import { svgToBase64 } from "../utils/svg-to-base64";
import { HttpError } from "./errors/http.error";

export class SkillUseCase {
    constructor(
        private readonly repo: SkillRepository
    ){}

    async create(dto: CreateSkillRequestDTO){
        const parsed = CreateSkillSchema.safeParse(dto);

        
        if (!parsed.success) {
            const errors = parsed.error.issues.map(e => e.message).join(', ');
            throw new Error(`Validation failed: ${errors}`);
        }
        
        const data = parsed.data;
        
        const skill = await this.repo.findByTitle(data.title);

        if (skill) throw new AlreadyExistsError(`skill ${data.title} already exists.`);

        const base64Image = svgToBase64(data.svgImage);
        await this.repo.save({
            base64Image,
            description: data.description,
            title: data.title
        });
    }

    async findAll(){
        return await this.repo.findAll();
    }

    async deleteByTitle(title: string){
        if (!title) throw new HttpError(400, 'invalid input.', 'a title must be provided.');
        await this.repo.delete(title);
    }
}

export type CreateSkillRequestDTO = z.infer<typeof CreateSkillSchema>;
export type CreateSkillDTO = {
    title: string,
    description: string,
    base64Image: string
};

export const CreateSkillSchema = z.object({
    title: z.string().min(1, "Title is required"),          // must be non-empty
    description: z.string().min(1, "Description is required"), // must be non-empty
    svgImage: z.string().min(1, "SVG image is required"),   // must be non-empty
});