import { MongoDBUsersRepository } from "../../../repositories/implementations/MongoDBUsersRepository";
import { TokenService } from "../../../services/implementations/TokenService";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const mongoUsersRepository = new MongoDBUsersRepository();
const tokenService = new TokenService();

const authenticateUserUseCase =  new AuthenticateUserUseCase(
    mongoUsersRepository,
    tokenService
);

const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase
);

export { authenticateUserController };