import { Skill } from "../entities/Skill";

export interface ISkillsRepository {
    findAll(): Promise<Skill[] | undefined>
    findByTitle(title: string): Promise<Skill | undefined>;
    getIdbyUuid(uuid: string): Promise<unknown>;
    save(skill: Skill): Promise<void>;
    update(_id: unknown, newData: Partial<Skill>): Promise<void>;
    delete(_id: unknown): Promise<void>;
}