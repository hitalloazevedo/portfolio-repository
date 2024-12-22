import { Project } from "../entities/Project";

export interface IProjectsRepository {
    findAll(): Promise<Project[]>
    findByTitle(title: string): Promise<Project> | null;
    save(project: Project): Promise<void>;
}