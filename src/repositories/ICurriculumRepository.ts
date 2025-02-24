import { File } from "../entities/File";

export interface ICurriculumRepository {
    get(fileName: string): Promise<File>;
}