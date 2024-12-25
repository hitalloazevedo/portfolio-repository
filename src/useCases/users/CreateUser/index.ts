import { CreateUserController } from "./CreateUserController";
import { CreateProjectUseCase } from "../../projects/CreateProject";
import { MongoDBUsersRepository } from "../../../repositories/implementations/MongoDBUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mongoUsersRepository = new MongoDBUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    mongoUsersRepository
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserController };