export function loadServiceUrl(){
    try {
        const serviceUrl = process.env.TO_KEEP_ALIVE_SERVICE_URL;
        if (!serviceUrl){
            throw new Error("Could not load service url from .env");
        }
        return serviceUrl.toString();
    } catch (error){
        process.exit(1);
    }
}