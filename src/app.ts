import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorhandler from './app/middlwares/globalErrorhandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
// import sendResponse from './app/utils/sendResponse';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

// globalErrorhandler
app.use(globalErrorhandler);

// notFound;
app.use(notFound);

// sendResponse
// app.use(sendResponse);

export default app;
