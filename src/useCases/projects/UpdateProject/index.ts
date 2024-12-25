import { UpdateProjectController } from "./UpdateProjectController";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";
import { MongoDBProjectsRepository } from "../../../repositories/implementations/MongoDBProjectsRepository";

const mongoProjectsRepository = new MongoDBProjectsRepository();

const updateProjectUseCase = new UpdateProjectUseCase(
    mongoProjectsRepository
)

const updateProjectController = new UpdateProjectController(
    updateProjectUseCase
)

export { updateProjectController };