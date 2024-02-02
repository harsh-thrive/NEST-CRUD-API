import { Module } from "@nestjs/common";
import { QueueWorkerService } from "./queue-worker.service";
import { OpensearchModule } from "src/open-search/core/open-search.module";
import { BookSubscription } from "src/bookSubscription/bookSubscription.module";


@Module({
    imports:[BookSubscription],
    providers:[QueueWorkerService,],
    exports:[QueueWorkerService]
})
export class QueueWorkerModule {}