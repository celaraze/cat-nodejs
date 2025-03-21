import {Sequelize} from 'sequelize';
import {databaseConfig} from "../config/env.js";

const sequelize = new Sequelize(databaseConfig.name, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export {sequelize};