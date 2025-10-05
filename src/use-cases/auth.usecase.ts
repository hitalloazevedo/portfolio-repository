import { IUsersRepository } from "../repositories/user.repository";
import { ITokenService } from "../services/ITokenService";
import { NotFoundError } from "./errors/not-found.error";

export class AuthUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenService: ITokenService
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new NotFoundError("user not found.");

    await user.comparePassword(password);
    
    const token = this.tokenService.generateToken({
      email,
      uuid: user.uuid,
    });

    return token;
  }

  async guard(token: string) {}
}
