import { makeUser } from "../entities/user";
import { IUsersRepository } from "../repositories/user.repository";
import { AlreadyExistsError } from "./errors/already-exists.error";

export class UserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async create(newUserData: {
        email: string,
        password: string
    }) {
        const userExists = await this.usersRepository.findByEmail(newUserData.email);

        if (userExists) throw new AlreadyExistsError("user already exists.");
       
        const user = await makeUser(newUserData);

        await this.usersRepository.save(user);

    }
}