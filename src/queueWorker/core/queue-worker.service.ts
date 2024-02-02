import { Job, Worker } from "bullmq";
import { OPEN_SEARCH_QUEUE } from "src/queue/constants/queue.constants";
import { Connection } from "../config/connection.config";
import { Inject, Injectable } from "@nestjs/common";
import { BookSubscriptionService } from "src/bookSubscription/bookSubscription.service";

@Injectable()
export class QueueWorkerService{
    private worker: Worker
    constructor(private bookSubscriptionService: BookSubscriptionService){
        this.worker = new Worker(OPEN_SEARCH_QUEUE, async(job) =>{
            this.processJob(job)
        }, { connection: Connection })
    }

    async processJob(job: Job) {
        try{
            const jobData = job.data.data
            await this.bookSubscriptionService.InjestToOpenSearch(jobData.indexName, jobData.data)
        }catch(error){
            throw new Error(`Error while publishing data to open search`)
        }
        
    }    
}