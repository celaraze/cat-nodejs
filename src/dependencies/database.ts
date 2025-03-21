import {DataSource} from "typeorm";
import {fileURLToPath} from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.join(dirname, "../entities/*.ts")],
    synchronize: true,
    logging: true,
    logger: "advanced-console"
})