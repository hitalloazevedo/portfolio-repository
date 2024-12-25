import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../../../entities/User";

interface ICreateUserRequestDTO {
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async execute(newUserData: ICreateUserRequestDTO) {
        const userExists = await this.usersRepository.findByEmail(newUserData.email);

        if (userExists) {
            throw new Error("Project already exists.");
        }

        const user = await User.create(newUserData.email, newUserData.password);

        await this.usersRepository.save(user);

    }
}