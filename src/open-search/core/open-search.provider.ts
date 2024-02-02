import { OpenSearchService } from "./open-search.service";

export const OpenSearchProvider = [
    {
        provide: 'OPEN_SEARCH',
        useFactory: async () => {
            const openSearchService: OpenSearchService = new OpenSearchService();
            await openSearchService.createClient();
            return openSearchService;
        }
    }
]