import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { getEnv } from '../helpers/get-env';
import { AuthorizationError } from '../use-cases/errors/authorization.error';

export interface ITokenPayload {
    uuid: string;
    email: string;
}

export class JwtTokenService {

    private static instance: JwtTokenService;
    private jwtSecret: string;
    private jwtExpires: number;

    private constructor() {
        dotenv.config();
        this.jwtSecret = String(getEnv('JWT_SECRET'));
        this.jwtExpires = Number(getEnv('JWT_EXPIRES_IN'));
    }

    public static getInstance(): JwtTokenService {
        if (!JwtTokenService.instance){
            JwtTokenService.instance = new JwtTokenService();
        }
        return JwtTokenService.instance;
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