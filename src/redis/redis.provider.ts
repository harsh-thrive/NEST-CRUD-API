import { RedisService } from "./redis.service";


export const RedisProvider = [
    {
        provide: 'REDIS',
        useFactory: async () => {
            const redisService = new RedisService()
            await redisService.createClient()
            return redisService;
        },
    }
]