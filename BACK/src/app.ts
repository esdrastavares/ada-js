import passport from 'passport';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { jwtPassport, localPassport } from './config/security';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './middlewares/logger';

import { LoginAuthRouter } from './modules/auth';

import {
  FindAllCardRouter,
  CreateCardRouter,
  UpdateCardRouter,
  DeleteCardRouter,
} from './modules/card';

const app: Express = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(passport.use(localPassport).use(jwtPassport).initialize());

app.use(logger);

app.use(LoginAuthRouter);
app
  .use(FindAllCardRouter)
  .use(CreateCardRouter)
  .use(UpdateCardRouter)
  .use(DeleteCardRouter);

app.use(errorHandler);

export default app;
