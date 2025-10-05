import mongoose from "mongoose";
import { makeSkill, Skill } from "../../entities/skill";
import { CreateSkillDTO } from "../../use-cases/skill.usecase";
import { SkillRepository } from "../skills.repository";

export const SkillSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    base64Image: { type: String, required: true },
});

const SkillModel = mongoose.model<Skill>("Skill", SkillSchema);

export class MongoSkillRepository implements SkillRepository {

    async save(dto: CreateSkillDTO): Promise<void> {
        const skill = new SkillModel(dto);
        await skill.save();
    }

    async findAll(): Promise<Skill[]> {
        const response = await SkillModel.find();
        return response.map(document => makeSkill({
            base64Image: document.base64Image,
            description: document.description,
            title: document.title,
        }));
    }

    async findByTitle(title: string): Promise<Skill | null> {
        const response = await SkillModel.findOne({ title });
        if (!response) return null;

        return makeSkill({
            base64Image: response.base64Image,
            description: response.description,
            title: response.title
        })
    }

    getIdbyUuid(uuid: string): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    update(_id: unknown, newData: Partial<Skill>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(title: string): Promise<void> {
        await SkillModel.deleteOne({ title });
    }

}