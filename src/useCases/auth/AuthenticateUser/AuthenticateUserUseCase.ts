import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { TokenService } from "../../../services/implementations/TokenService";
import { ITokenService } from "../../../services/ITokenService";
import { IAuthenticateUserRequestDTO } from "./AuthenticateUserDTO";

export class AuthenticateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository,
        private tokenService: ITokenService
    ) {}

    async execute(user: IAuthenticateUserRequestDTO){
        const savedUser = await this.usersRepository.findByEmail(user.email);

        if (!savedUser) {
            throw new Error("User not found.")
        }

        const auth = await savedUser.comparePassword(user.password);

        if (!auth) {
            throw new Error("Invalid credentials.")
        }

        const token = this.tokenService.generateToken({ email: savedUser.email, uuid: String(savedUser.uuid) })

        return token;

    }
}