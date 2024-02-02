import { OPEN_SEARCH_QUEUE } from "../constants/queue.constants"
import { QueueService } from "./queue.service"

export const QueueProvider = [
    {
        provide: 'QUEUE',
        useFactory: async () => {
            const queueService = new QueueService()
            const response = await queueService.createQueue(OPEN_SEARCH_QUEUE)
            //console.log(response)
            return queueService
        }
    }
]