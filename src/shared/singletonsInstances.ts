import { RedisCache } from "../infrastructure/cache/implementation/RedisCache";
import { MongoDBSkillsRepository } from "../repositories/implementations/MongoDBSkillsRepository";
import { MongoDBProjectsRepository } from "../repositories/implementations/MongoDBProjectsRepository";

const redisCacheInstance = RedisCache.getInstance();
const mongoDBSkillsRepository = MongoDBSkillsRepository.getInstance(redisCacheInstance);
const mongoDBProjectsRepository = MongoDBProjectsRepository.getInstance(redisCacheInstance);

export { mongoDBProjectsRepository, mongoDBSkillsRepository };