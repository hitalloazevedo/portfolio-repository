import { PostgresProjectsRepository } from "../../repositories/implementations/PostgresProjectsRepository";
import { GetAllProjectController } from "./GetAllProjectController";
import { GetAllProjectUseCase } from "./GetAllProjectUseCase";

const postgresProjectsRepository = new PostgresProjectsRepository();

const getAllProjectUseCase = new GetAllProjectUseCase(
    postgresProjectsRepository
)

const getAllProjectController = new GetAllProjectController(
    getAllProjectUseCase
)

export { getAllProjectController };