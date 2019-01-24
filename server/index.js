import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';

dotenv.config();
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send({
    status: 'connection successful',
    message: 'Welcome to Politico'
}));
const port = 3000;
app.listen(process.env.port || `${port}`, () => console.log(`server running at localhost ${port}`));

export default app;