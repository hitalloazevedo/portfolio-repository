import { ICache } from "../ICache";
import Redis from "ioredis";
import dotenv from "dotenv"

export class RedisCache implements ICache {

    private client: Redis;
    private static instance: RedisCache;

    private constructor (){
        // configuração para conseguir ler as variaveis de
        dotenv.config();

        const redisUrl = String(process.env.REDIS_URL);

        this.client = new Redis(redisUrl, {
            tls: { rejectUnauthorized: false },
            keepAlive: 1000,
            retryStrategy: (times) => Math.min(times * 50, 2000),
        });
    }

    public static getInstance(): RedisCache {
        if (!RedisCache.instance) {
            RedisCache.instance = new RedisCache();
        }

        return RedisCache.instance;
    }

    async set<T>(key: string, value: T, ttl: number): Promise<void> {
        const data: string = JSON.stringify(value);
        await this.client.setex(key, ttl, data);
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (data != null){
            return JSON.parse(data) as T;
        }

        return data;
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
