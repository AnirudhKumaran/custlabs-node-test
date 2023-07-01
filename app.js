import express from 'express';
import bodyParser from 'body-parser';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';
import itemsRoutes from './routes/items.routes';
import userRoutes from './routes/user.routes'
import destinRoutes from './routes/destination.routes'
import dataRoutes from './routes/data.routes'
const session = require('express-session');
const cookieParser = require('cookie-parser');
import * as sqlite3 from 'sqlite3'
import sqliteStoreFactory from 'express-session-sqlite'

const port = 3000;
export const app = express();

app.listen(port, () => console.log(`Authentication example app listening on port ${port}!`));
app.use(bodyParser.json());
app.use(authMiddleware);
app.use(cookieParser());

app.use(session({ secret: "super secret string" }));
const SqliteStore = sqliteStoreFactory(session)
app.use(session({
    store: new SqliteStore({
        driver: sqlite3.Database,
        path: ':memory:',
        ttl: 604800000, // 1 week in miliseconds
    }),
}));

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/destination', destinRoutes);
app.use('/server/incoming_data',dataRoutes)
app.use('/api/items', authenticated, itemsRoutes);