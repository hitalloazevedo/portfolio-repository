import dotenv from 'dotenv'
import { app } from "./app";
import { MongoDBRepository } from "./repositories/MongoDBRepository";
import { StayAwakeService } from "./services/implementations/StayAwakeService";
import { loadServiceUrl } from './utils/load-service-url';

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const serviceUrl = loadServiceUrl();
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