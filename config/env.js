import yaml from "js-yaml";
import fs from "fs";

// For IDE to recognize the config object.
let config = {};
config.jwt = undefined;
config.database = undefined;

let databaseConfig = {};
databaseConfig.name = undefined;
databaseConfig.username = undefined;
databaseConfig.password = undefined;
databaseConfig.host = undefined;
databaseConfig.dialect = undefined;

let jwtConfig = {};
jwtConfig.secret = undefined;
jwtConfig.expiresIn = undefined;
jwtConfig.refreshExpiresIn = undefined;

config = yaml.load(fs.readFileSync('env.yaml', 'utf8'));
databaseConfig = config.database;
jwtConfig = config.jwt;

export {databaseConfig, jwtConfig};