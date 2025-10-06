import { JwtTokenService } from "../infra/jwt-token.service";
import { UserRepository } from "../repositories/interfaces/user.repository";
import { AuthorizationError } from "./errors/authorization.error";

export class AuthUseCase {
  constructor(
    private usersRepository: UserRepository,
    private tokenService: JwtTokenService
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
