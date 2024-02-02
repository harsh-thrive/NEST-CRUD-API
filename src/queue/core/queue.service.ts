import { Job, Queue } from "bullmq";

export class QueueService {
    private openSearchQueue: Queue;

    constructor(){}
    
    async createQueue(queuName: string) {
        this.openSearchQueue = new Queue(queuName, { connection: {
            host: "localhost",
            port: 6379
        }})
    }
    
    async addJob(name: string, data: any): Promise<Job>{
        try{
            const response = await this.openSearchQueue.add(name, { data });
            return response
        }catch(error){
            console.log(`Error while adding job to the queue:${name} caused by ${error}`)
        }
    }
}