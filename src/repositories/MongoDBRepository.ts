import mongoose from 'mongoose';

// This class provides methods to open a connection with MongoDB following Singleton pattern
// (i.e) after call 
export class MongoDBRepository {

    private static instance: mongoose.Connection;

    public static async openConnection(): Promise<mongoose.Connection>{
        if (!MongoDBRepository.instance){
            console.log("Connecting to MongoDB...");

            await mongoose.connect(
                process.env.MONGODB_CONNECTION_STRING as string
            )

            MongoDBRepository.instance = mongoose.connection;
            MongoDBRepository.instance.on("connected", () => console.log("✅ MongoDB connected"));
            MongoDBRepository.instance.on("error", (err) => console.error("❌ MongoDB error:", err));
        }
        return MongoDBRepository.instance;
    }

    public static async closeConnection(): Promise<void> {
        try {
            if (MongoDBRepository.instance){
                await mongoose.connection.close();
                console.log("MongoDB connection closed successfully.")
            }
            console.log("No MongoDB connections to close.")
        } catch (err) {
            console.log("Error closing MongoDB connection: ", err);
        }
    }
}