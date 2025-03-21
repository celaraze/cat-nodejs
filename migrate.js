import umzug from './config/umzug.js';

(async () => {
    try {
        // 执行所有未执行的迁移
        await umzug.up();
        console.log('Migrations have been applied successfully.');
    } catch (error) {
        console.error('Error applying migrations:', error);
    }
})();