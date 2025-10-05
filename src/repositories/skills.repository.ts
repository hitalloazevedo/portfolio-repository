import { Skill } from "../entities/skill";

export interface ISkillsRepository {
    findAll(): Promise<Skill[] | null>
    findByTitle(title: string): Promise<Skill | null>;
    getIdbyUuid(uuid: string): Promise<unknown>;
    save(skill: Skill): Promise<void>;
    update(_id: unknown, newData: Partial<Skill>): Promise<void>;
    delete(_id: unknown): Promise<void>;
}