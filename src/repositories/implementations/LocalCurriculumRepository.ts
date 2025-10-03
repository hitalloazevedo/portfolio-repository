import { File } from "../../entities/pdf-file";
import { ICurriculumRepository } from "../ICurriculumRepository";
import path from "path";

export class LocalCurriculumRepository implements ICurriculumRepository {
    async get(fileName: string): Promise<File> {
        const basePath = path.join(__dirname, "../../files");

        const filePath = path.join(basePath, fileName);

        return new File(fileName, filePath);
    }
}