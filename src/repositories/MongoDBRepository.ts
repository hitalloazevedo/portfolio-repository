import mongoose from 'mongoose';
import { getEnv } from '../utils/get-env';

// This class provides methods to open a connection with MongoDB following Singleton pattern
// (i.e) after call 
export class MongoDBRepository {

    private static instance: mongoose.Connection;

    public static async openConnection(): Promise<void>{
        if (!MongoDBRepository.instance){
            console.log("Connecting to MongoDB...");

            try {
                await mongoose.connect(
                    getEnv('MONGODB_CONNECTION_STRING')
                )

                console.log("Connected to MongoDB database!")
            } catch (err) {
                if (err instanceof Error){
                    console.log("[MongoDB connection error]", err.message);
                }
                process.exit(1);
            }

            MongoDBRepository.instance = mongoose.connection;
        }
    }

    public static async closeConnection(): Promise<void> {
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed successfully.")
        } catch (err) {
            console.log("Error closing MongoDB connection: ", err);
        }
    }
}