import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
// import userRoutes from './routes/user';
import mongoose from 'mongoose';

const router = express();

/** Connect to Mongo */
// mongoose
//     .connect(config.mongo.url, config.mongo.options)
//     .catch((error) => {
//         console.error(error.message, error);
//     });

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Routes go here */
// router.use('/users', userRoutes);

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => console.info(`Server is running ${config.server.hostname}:${config.server.port}`));