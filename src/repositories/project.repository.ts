import { CreateProjectDTO, Project } from "../entities/project";

export interface ProjectRepository {
    findAll(): Promise<Project[]>
    save(project: CreateProjectDTO): Promise<void>;
    delete(uuid: string): Promise<void>;
    findByUUID(uuid: string): Promise<Project | null>;
}