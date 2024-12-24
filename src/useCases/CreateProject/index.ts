import { PostgresProjectsRepository } from "../../repositories/implementations/PostgresProjectsRepository";
import { CreateProjectController } from "./CreateProjectController";
import { CreateProjectUseCase } from "./CreateProjectUseCase";
import { MongoDBProjectsRepository } from "../../repositories/implementations/MongoDBProjectsRepository";

// const postgresProjectsRepository = new PostgresProjectsRepository();
const mongoProjectsRepository = new MongoDBProjectsRepository();

const createProjectUseCase = new CreateProjectUseCase(
    mongoProjectsRepository
)

const createProjectController = new CreateProjectController(
    createProjectUseCase
)

export { createProjectController, CreateProjectUseCase };