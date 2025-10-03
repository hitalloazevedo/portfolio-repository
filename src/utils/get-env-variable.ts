export function getEnv(key: string){
    try {
        const value = process.env[key];
        if (!value){
            throw new Error(`Error to load ${key} env variable.`);
        }
        return value;
    } catch (error){
        console.log(`Error to load ${key} env variable.`);
        process.exit(1);
    }
}