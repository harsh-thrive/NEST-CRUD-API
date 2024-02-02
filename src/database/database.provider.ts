import { DatabaseService } from "./database.service"

export const DatabaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const databaseService = new DatabaseService()
            await databaseService.getSequelizeInstance()
            return databaseService;
        },
    },
]
    