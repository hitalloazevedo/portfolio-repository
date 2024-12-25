import dotenv from 'dotenv';
import mongoose from 'mongoose';

export class MongoDBRepository {

    protected connectionString: string;

    constructor(){

        // configuração para conseguir ler as variaveis de
        dotenv.config();

        this.connectionString = String(process.env.MONGODB_CONNECTION_STRING);

    }

    async connect(){
        try {
            await mongoose.connect(this.connectionString);
        } catch (err) {
            console.log("Error connecting to MongoDB: ", err);
        }

    }

    async closeConnection(): Promise<void> {
        try {
            await mongoose.connection.close();
        } catch (err) {
            console.log("Error closing MongoDB connection: ", err);
        }
    }
}