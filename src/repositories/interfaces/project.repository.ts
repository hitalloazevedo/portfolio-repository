import { CreateProjectDTO, Project } from "../entities/project";

export interface ProjectRepository {
    findAll(): Promise<Project[]>
    save(project: CreateProjectDTO): Promise<void>;
    deleteByTitle(title: string): Promise<void>;
    findByTitle(title: string): Promise<Project | null>;
}