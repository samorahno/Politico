import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import politicalPartyRoute from './routes/politicalParty';

dotenv.config();
const app = express();

app.use(express.json());
app.get('/api/v1', (req, res) => res.send({
    status: 'connection successful',
    message: 'Welcome to Politico'
}));

app.use('/api/v1',politicalPartyRoute);

app.get('*', (req, res) => {
    return res.status(404).json({'message': 'Page not found. Please visit /api/v1'});
  })

const port = 3000;
app.listen(process.env.port || `${port}`, () => console.log(`server running at localhost ${port}`));

export default app;