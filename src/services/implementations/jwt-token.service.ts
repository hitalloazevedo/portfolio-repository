import jwt from 'jsonwebtoken'
import { ITokenPayload, ITokenService } from '../ITokenService';
import { getEnv } from '../../utils/get-env';
import { AuthorizationError } from '../../use-cases/errors/authorization.error';
import dotenv from 'dotenv';

export class TokenService implements ITokenService {

    private static instance: TokenService;
    private jwtSecret: string;
    private jwtExpires: number;

    private constructor() {
        dotenv.config();
        this.jwtSecret = String(getEnv('JWT_SECRET'));
        this.jwtExpires = Number(getEnv('JWT_EXPIRES_IN'));
    }

    public static getInstance(): TokenService {
        if (!TokenService.instance){
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    generateToken(payload: ITokenPayload): string {
        const token = jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.jwtExpires,
            subject: payload.uuid
        })

        return token;
    }

    verifyToken(token: string): ITokenPayload | undefined {
        try {
            return jwt.verify(token, this.jwtSecret) as ITokenPayload;
        } catch (err: any) {
            throw new AuthorizationError("failed to validate jwt token.");
        }
    }
} 