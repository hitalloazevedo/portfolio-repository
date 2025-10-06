import { Skill } from "../../entities/skill";

export interface SkillRepository {
    findAll(): Promise<Skill[] | null>
    findByTitle(title: string): Promise<Skill | null>;
    save(skill: Skill): Promise<void>;
    delete(title: string): Promise<void>;
}