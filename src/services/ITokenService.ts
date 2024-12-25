export interface ITokenPayload {
    uuid: string;
    email: string;
}

export interface ITokenService {
    generateToken(payload: ITokenPayload): string;
    verifyToken(token: string): ITokenPayload | undefined;
}