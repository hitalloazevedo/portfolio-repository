import { app } from "./app";
import dotenv from 'dotenv'
import { StayAwakeService } from "./services/implementations/StayAwakeService";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const awakeService = new StayAwakeService("https://projects-repository.onrender.com", 14);

app.listen(port, () => {
    console.log(`Server running!`);

    // cronjob to make the backend alive
    awakeService.start();
})