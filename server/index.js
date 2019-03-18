import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import politicalPartyRoute from './routes/politicalParty';
import politicalOfficeRoute from './routes/politicalOffice';
import userAuthRoute from './routes/userAuth';
import VoteRoute from './routes/vote';
import resultRoute from './routes/Result';
import candidateRoute from './routes/candidate';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static('UI/'));
app.use(cors());
const swaggerDocument = require('../swagger.json');

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));
app.get('/api/v1', (req, res) => res.send({
  status: 200,
  message: 'Welcome to Politico',
}));
// middleware
app.use('/api/v1', politicalPartyRoute);
app.use('/api/v1', politicalOfficeRoute);
app.use('/api/v1/auth', userAuthRoute);
app.use('/api/v1', VoteRoute);
app.use('/api/v1', resultRoute);
app.use('/api/v1', candidateRoute);

app.use('*', (req, res) => res.status(404).json(
  {
    message: 'Page not found. Please visit /api/v1',
  },
));

const port = 9000;
// eslint-disable-next-line no-console
app.listen(process.env.PORT || `${port}`, () => console.log(`server running at localhost ${port}`));

export default app;
