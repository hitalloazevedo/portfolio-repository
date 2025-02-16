import { CreateProjectController } from "./CreateProjectController";
import { CreateProjectUseCase } from "./CreateProjectUseCase";
import { mongoDBProjectsRepository } from "../../../shared/singletonsInstances";

const createProjectUseCase = new CreateProjectUseCase(
    mongoDBProjectsRepository
)

const createProjectController = new CreateProjectController(
    createProjectUseCase
)

export { createProjectController, CreateProjectUseCase };