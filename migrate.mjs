import { sequelize } from './app.js';
import Umzug from 'umzug';

const umzug = new Umzug({
    migrations: {
        glob: 'migrations/*.js'
    },
    context: sequelize.getQueryInterface(),
    storage: 'sequelize',
    storageOptions: {
        sequelize
    }
});

// 获取命令行参数
const command = process.argv[2];

if (command === 'up') {
    // 执行迁移
    (async () => {
        try {
            await umzug.up();
            console.log('All migrations performed successfully');
        } catch (error) {
            console.error('Error performing migrations:', error);
        }
    })();
} else if (command === 'down') {
    // 回滚迁移
    (async () => {
        try {
            await umzug.down();
            console.log('Last migration rolled back successfully');
        } catch (error) {
            console.error('Error rolling back migration:', error);
        }
    })();
} else {
    console.log('Please provide a valid command: "up" or "down"');
}
    