import { Project } from "../entities/Project";

export interface IProjectsRepository {
    findAll(): Promise<Project[] | undefined>
    findByTitle(title: string): Promise<Project | undefined>;
    save(project: Project): Promise<void>;
}