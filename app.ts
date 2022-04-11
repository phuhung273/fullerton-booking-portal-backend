import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import authRoutes from './routes/auth';
import roleRoutes from './routes/role';
import permissionRoutes from './routes/permission';
import bookingRoutes from './routes/booking';
import mongoose from 'mongoose';
var cors = require('cors');

const app = express();
app.use(cors())

/** Connect to Mongo */
if(process.env.ENV !== 'production'){
    mongoose.set('debug', true);
}

mongoose
    .connect(config.mongo.url)
    .catch((error) => {
        console.error(error.message, error);
    });

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Routes go here */
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);
app.use('/bookings', bookingRoutes);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => console.info(`Server is running ${config.server.hostname}:${config.server.port}`));