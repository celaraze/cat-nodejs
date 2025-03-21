import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
// import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
// import roleRoutes from './routes/roleRoutes';
import {appDataSource} from "./dependencies/database";


appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch(error => {
        console.error(error);
    })

const app = express();
app.use(bodyParser.json());

// // 使用用户路由
// app.use('/api/users', userRoutes);
// 使用认证路由
app.use('/api/auth', authRoutes);
// // 使用角色路由
// app.use('/api/roles', roleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});