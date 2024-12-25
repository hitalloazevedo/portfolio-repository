import { MongoDBProjectsRepository } from "../../../repositories/implementations/MongoDBProjectsRepository";
import { DeleteProjectController } from "./DeleteProjectContoller";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

const mongoProjectsRepository = new MongoDBProjectsRepository();

const deleteProjectUseCase = new DeleteProjectUseCase(
    mongoProjectsRepository
);

const deleteProjectController = new DeleteProjectController(
    deleteProjectUseCase
);

export { deleteProjectController };