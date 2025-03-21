import {DataSource} from "typeorm";

const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + "entities/*.ts"],
    synchronize: true,
})

export {appDataSource}