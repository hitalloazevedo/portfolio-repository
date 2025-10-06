import { Skill } from "../../entities/skill";

export interface SkillRepository {
    findAll(): Promise<Skill[] | null>
    findByTitle(title: string): Promise<Skill | null>;
    save(skill: Skill): Promise<void>;
    deleteByTitle(title: string): Promise<void>;
}