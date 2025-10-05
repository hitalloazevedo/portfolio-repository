import { IUsersRepository } from "../repositories/user.repository";
import { ITokenService } from "../services/ITokenService";

export class AuthUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenService: ITokenService
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("User not found.");

    await user.comparePassword(password);
    
    const token = this.tokenService.generateToken({
      email,
      uuid: user.getUuid,
    });

    return token;
  }

  async guard(token: string) {}
}
