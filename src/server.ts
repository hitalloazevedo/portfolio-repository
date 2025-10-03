import dotenv from 'dotenv'
import { app } from "./app";
import { MongoDBRepository } from "./repositories/MongoDBRepository";
import { StayAwakeService } from "./services/implementations/StayAwakeService";
import { getEnv } from './utils/get-env-variable';

dotenv.config();

const port = Number(getEnv("PORT"));
const serviceUrl = getEnv("TO_KEEP_ALIVE_SERVICE_URL");
const awakeService = new StayAwakeService(serviceUrl, 14);

MongoDBRepository.openConnection();

app.listen(port, () => {
    
    console.log(`Server running on port ${port}!`);

    // start cronjob to keep the application alive
    awakeService.start();
})

// Add shutdown handling to close the MongoDB connection when the app shuts down
process.on('SIGINT', async () => {
    console.log("Gracefully shutting down...");
    await MongoDBRepository.closeConnection();
    process.exit(0); // Exit the process
});