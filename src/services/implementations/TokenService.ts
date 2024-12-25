import jwt from 'jsonwebtoken'
import { User } from '../../entities/User'
import dotenv from 'dotenv'
import { ITokenPayload, ITokenService } from '../ITokenService';

export class TokenService implements ITokenService {

    private jwtSecret: string;
    private jwtExpires: number;

    constructor() {

        dotenv.config();
        this.jwtSecret = String(process.env.JWT_SECRET);
        this.jwtExpires = Number(process.env.JWT_EXPIRES_IN);

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
            console.error('Token verification failed:', err.message);
            throw new Error('Invalid or expired token.');
        }
    }
} 