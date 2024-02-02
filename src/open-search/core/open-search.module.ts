import { Module } from "@nestjs/common";
import { OpenSearchProvider } from "./open-search.provider";

@Module({
    imports:[],
    providers:[...OpenSearchProvider],
    controllers:[],
    exports:[...OpenSearchProvider]
})
export class OpensearchModule {}