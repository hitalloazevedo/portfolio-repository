import { Skill } from "../entities/skill";
import { CreateSkillDTO } from "../use-cases/skill.usecase";

export interface SkillRepository {
    findAll(): Promise<Skill[] | null>
    findByTitle(title: string): Promise<Skill | null>;
    save(skill: CreateSkillDTO): Promise<void>;
    delete(title: string): Promise<void>;
}