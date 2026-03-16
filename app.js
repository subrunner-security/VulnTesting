import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './src/api/routes.js';
import { initDB } from './src/database/db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

initDB();

app.use('/api', router);

app.listen(3001, () => {
    console.log('Test Vulnerable App running on port 3001');
});
