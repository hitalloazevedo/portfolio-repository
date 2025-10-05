import { IUsersRepository } from "../repositories/user.repository";
import { ITokenService } from "../services/ITokenService";
import { AuthorizationError } from "./errors/authorization.error";

export class AuthUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenService: ITokenService
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AuthorizationError("invalid credentials.");

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new AuthorizationError("invalid credentials.");
    
    const token = this.tokenService.generateToken({
      email,
      uuid: user.uuid,
    });

    return token;
  }

  async guard(token: string) {}
}
