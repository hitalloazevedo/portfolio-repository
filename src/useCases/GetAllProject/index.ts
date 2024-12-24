import { GetAllProjectController } from "./GetAllProjectController";
import { GetAllProjectUseCase } from "./GetAllProjectUseCase";
import { MongoDBProjectsRepository } from "../../repositories/implementations/MongoDBProjectsRepository";

// const postgresProjectsRepository = new PostgresProjectsRepository();
const mongoProjectsRepository = new MongoDBProjectsRepository();

const getAllProjectUseCase = new GetAllProjectUseCase(
    mongoProjectsRepository
)

const getAllProjectController = new GetAllProjectController(
    getAllProjectUseCase
)

export { getAllProjectController };