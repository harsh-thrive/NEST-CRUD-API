import { Injectable } from "@nestjs/common";
import { ApiResponse } from "@opensearch-project/opensearch/.";
import { OpensearchClient } from "nestjs-opensearch";

@Injectable()
export class OpenSearchService {
    private openSearchClient: OpensearchClient;

    async createClient(){
        const host = "localhost";
        const protocol = "https";
        const port = 9200;
        const auth = "admin:admin";
        this.openSearchClient =  new OpensearchClient({
            clientName: 'opensearch-node1',
            node: protocol + "://" + auth + "@" + host + ":" + port,
            ssl: {
                rejectUnauthorized: false,
              },
        })
    }

    getClient(): OpensearchClient {
        return this.openSearchClient;
    }

    async addDocument(indexName: string, body: any): Promise<Boolean> {
        try {
            let response: any
            const isIndexPresent = await this.isIndexPresent(indexName);
            if (isIndexPresent == true) {
                console.log("indexName:", indexName)
                response = await this.openSearchClient.index({
                    index: indexName,
                    body: body
                })
            }
            return response.statusCode === 200;
        } catch (error) {
            throw new Error(`Error while adding new doc to index: ${indexName} caused by:${error}`)
        }
    }

    async deleteDocument(indexName: string, body: any) {
        try{
            const response = await this.openSearchClient.deleteByQuery({
                index: indexName,
                body: body
            })
            return response.statusCode === 200;
        }catch(error){
            throw new Error(`Error while Deleting a doc in index: ${indexName} caused by:${error}`)
        }
    }

    async createIndex(indexName: string, mapping: any): Promise<Boolean>{
        try{
            const isIndexPresent = await this.isIndexPresent(indexName);
            if(isIndexPresent == false){
                await this.openSearchClient.indices.create({
                    index: indexName,
                    body: mapping
                })
            }
            return true
        }catch(error){
            throw new Error(`Error while creating new index named: ${indexName} caused by:${error}`)
        }
    }
    
    async searchIndex(indexName: string, query: any): Promise<ApiResponse>{
        try{
            const response = await this.openSearchClient.search({
                index: indexName,
                body: query
            })
            return response
        }catch(error){
            throw new Error(`Error while searching new index named: ${indexName} with query:${query} caused by:${error}`)
        }
    }

    async isIndexPresent(indexName: string): Promise<Boolean>{
        try{
            const response = await this.openSearchClient.indices.exists({
                index: indexName,
              });
              return response.statusCode === 200;
        }catch (error) {
            throw new Error(`Error while checking index named: ${indexName} caused by:${error}`)
        }
    }
}