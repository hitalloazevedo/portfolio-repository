import { LoadEnvError } from "../errors/load-env.error";

export function getEnv(key: string){
    try {
        const value = process.env[key];
        if (!value){
            throw new LoadEnvError(`error to load ${key} variable.`);
        }
        return value;
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}