import mongoose from "mongoose";
import { makeSkill, Skill } from "../../entities/skill";
import { SkillRepository } from "../interfaces/skill.repository";
import { MemoryCache } from "../../infra/cache/memory-cache.service";

export const SkillSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    base64Image: { type: String, required: true },
});

const SkillModel = mongoose.model<Skill>("Skill", SkillSchema);

export class MongoSkillRepository implements SkillRepository {

    constructor(
        private readonly cache: MemoryCache,
        private readonly cacheKey = 'skills'
    ){}

    async save(dto: Skill): Promise<void> {
        const skill = new SkillModel(dto);
        await skill.save();
        this.cache.delete(this.cacheKey);
    }

    async findAll(): Promise<Skill[]> {
        const cachedSkills = await this.cache.get<Skill[]>(this.cacheKey);
        if (cachedSkills) return cachedSkills;

        const response = await SkillModel.find();
        const skills = response.map(document => makeSkill({
            base64Image: document.base64Image,
            description: document.description,
            title: document.title,
        }));

        this.cache.set<Skill[]>(this.cacheKey, skills);

        return skills;
    }

    async findByTitle(title: string): Promise<Skill | null> {
        const cachedSkills = await this.cache.get<Skill[]>(this.cacheKey);
        if (cachedSkills){
            return cachedSkills.filter((skill) => skill.title === title)[0];
        };

        const response = await SkillModel.findOne({ title });
        if (!response) return null;

        return makeSkill({
            base64Image: response.base64Image,
            description: response.description,
            title: response.title
        })
    }

    async deleteByTitle(title: string): Promise<void> {
        const { deletedCount } = await SkillModel.deleteOne({ title });
        if (deletedCount > 0) {
            console.log(`Skill (${title}) deleted!`);
        }
        this.cache.delete(this.cacheKey);
    }

}