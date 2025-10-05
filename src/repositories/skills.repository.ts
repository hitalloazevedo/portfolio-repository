import { Skill } from "../entities/skill";
import { CreateSkillDTO } from "../use-cases/skill.usecase";

export interface SkillRepository {
    findAll(): Promise<Skill[] | null>
    findByTitle(title: string): Promise<Skill | null>;
    getIdbyUuid(uuid: string): Promise<unknown>;
    save(skill: CreateSkillDTO): Promise<void>;
    update(_id: unknown, newData: Partial<Skill>): Promise<void>;
    delete(title: string): Promise<void>;
}