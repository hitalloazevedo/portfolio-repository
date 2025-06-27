import { MemoryCache } from "../infrastructure/cache/implementation/memory-cache";
import { MongoDBSkillsRepository } from "../repositories/implementations/MongoDBSkillsRepository";
import { MongoDBProjectsRepository } from "../repositories/implementations/MongoDBProjectsRepository";

const memoryCacheInstance = MemoryCache.getInstance();
const mongoDBSkillsRepository = MongoDBSkillsRepository.getInstance(memoryCacheInstance);
const mongoDBProjectsRepository = MongoDBProjectsRepository.getInstance(memoryCacheInstance);

export { mongoDBProjectsRepository, mongoDBSkillsRepository };