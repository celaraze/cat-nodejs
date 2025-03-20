import {sequelize} from './database.js';
import {SequelizeStorage, Umzug} from 'umzug';
import path from 'path';
import {pathToFileURL} from 'url';

const umzug = new Umzug({
    migrations: {
        glob: 'migrations/*.js',
        resolve: async ({name, path: migrationPath, context}) => {
            const migration = await import(pathToFileURL(path.resolve(migrationPath)).href);
            return {
                name,
                up: async () => migration.up(context),
                down: async () => migration.down(context)
            };
        }
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
});

const runMigrations = async () => {
    const migrations = await umzug.up();
    migrations.forEach(migration => console.log(`Migrated ${migration.name}`));
};

const rollbackMigrations = async () => {
    const migrations = await umzug.down();
    migrations.forEach(migration => console.log(`Rolled back ${migration.name}`));
};

const command = process.argv[2];
if (command === 'up') {
    runMigrations();
} else if (command === 'down') {
    rollbackMigrations();
} else {
    console.log('Please specify a valid command: up or down');
}