import { Redis } from 'ioredis';
import { redisConfig } from './redis.config';



export class RedisService {
    private redisClient: Redis;
    
    async createClient(){
        this.redisClient = new Redis(redisConfig);
    }

    getClient(){
        return this.redisClient
    } 

    async set(key: string, value: string, TTL: number): Promise<Boolean>{
        try {
            await this.redisClient.set(key, value, 'EX', TTL);
            return true
        } catch (error) {
            throw new Error(`Error while setting the otp key caused by: ${error}`)
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            const value = await this.redisClient.get(key);
            console.log('Redis value:',value)
            return value
        } catch (error) {
            throw new Error(`Error while getting the otp key caused by: ${error}`)
        }
    }

    async increment(key: string): Promise<Boolean>{
        try{
            await this.redisClient.incr(key);
            return true
        }catch(error){
            throw new Error(`Error while incrementing the wrong password count caused by: ${error}`)
        }
    }

    async expire(key: string, TTL: number): Promise<Boolean>{
        try{
            await this.redisClient.expire(key, TTL);
            return true
        }catch(error){
            throw new Error(`Error while setting expiration for the wrong password count caused by: ${error}`)
        }
    }

    async del(key: string): Promise<Boolean>{
        try{
            await this.redisClient.del(key);
            return true
        }catch(error){
            throw new Error(`Error while deleting key:${key} caused by: ${error}`)
        }
    }
}