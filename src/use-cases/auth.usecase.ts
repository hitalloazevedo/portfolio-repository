import { IUsersRepository } from "../repositories/user.repository";
import { ITokenService } from "../services/ITokenService";

export class AuthUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenService: ITokenService
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const savedUser = await this.usersRepository.findByEmail(email);

    if (!savedUser) {
      throw new Error("User not found.");
    }

    const auth = await savedUser.comparePassword(password);

    if (!auth) {
      throw new Error("Invalid credentials.");
    }

    const token = this.tokenService.generateToken({
      email,
      uuid: savedUser.getUuid,
    });

    return token;
  }

  async guard(token: string) {}
}
