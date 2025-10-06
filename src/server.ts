import dotenv from 'dotenv'
import { app } from "./app";
import { MongoClient } from "./infra/db/mongo";
import { KeepAliveService } from "./infra/http/keep-alive.service";
import { getEnv } from './helpers/get-env';

dotenv.config();

const port = Number(getEnv("PORT"));
const apiUrl = getEnv("SERVER_URL");
const awakeService = new KeepAliveService(apiUrl, 14);

MongoClient.openConnection();

app.listen(port, () => {
    
    console.log(`Server running on port ${port}!`);

    // start cronjob to keep the application alive
    awakeService.start();
})

// Add shutdown handling to close the MongoDB connection when the app shuts down
process.on('SIGINT', async () => {
    console.log("Gracefully shutting down...");
    await MongoClient.closeConnection();
    process.exit(0); // Exit the process
});