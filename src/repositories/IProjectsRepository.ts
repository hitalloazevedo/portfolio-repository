import { Project } from "../entities/Project";

export interface IProjectsRepository {
    findAll(): Promise<Project[] | undefined>
    findByTitle(title: string): Promise<Project | undefined>;
    getIdbyUuid(uuid: string): Promise<unknown>;
    save(project: Project): Promise<void>;
    update(_id: unknown, newData: Partial<Project>): Promise<void>;
    delete(_id: unknown): Promise<void>;
}