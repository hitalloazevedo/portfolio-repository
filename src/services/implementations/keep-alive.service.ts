import cron from "node-cron";
import https from "https";

export class KeepAliveService {
    constructor(
        private url: string,
        private minutes: number
    ) { }

    start() {
        cron.schedule(`*/${this.minutes} * * * *`, () => {
            
            https.get(this.url, (response) => {
                response.statusCode === 200 ? console.log("Backend is alive!") : console.log("Failed to wake up the backend.");
                
            }).on('error', (error) => {
                console.log("Error during restart: ", error.message);
            })

        })
    }
}