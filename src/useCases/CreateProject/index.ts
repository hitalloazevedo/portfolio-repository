import { PostgresProjectsRepository } from "../../repositories/implementations/PostgresProjectsRepository";
import { CreateProjectController } from "./CreateProjectController";
import { CreateProjectUseCase } from "./CreateProjectUseCase";

const postgresProjectsRepository = new PostgresProjectsRepository();

const createProjectUseCase = new CreateProjectUseCase(
    postgresProjectsRepository
)

const createProjectController = new CreateProjectController(
    createProjectUseCase
)

export { createProjectController, CreateProjectUseCase };