import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL,
    },
    migrations: {
        // В Prisma 7 команда сида должна быть в секции migrations
        seed: 'npx tsx ./prisma/seed.ts',
    },
});