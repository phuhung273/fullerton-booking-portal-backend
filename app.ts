import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import authRoutes from './routes/auth';
import roleRoutes from './routes/role';
import permissionRoutes from './routes/permission';
import mongoose from 'mongoose';

const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url)
    .catch((error) => {
        console.error(error.message, error);
    });

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Routes go here */
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => console.info(`Server is running ${config.server.hostname}:${config.server.port}`));