import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { signupUser, loginUser, getUserDockets, saveDocketToUser, removeDocketFromUser } from './User';
import fireAuth from '../util/fireAuth';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

import clRouter from './CourtListener';

// User-route
const userRouter = Router();
userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/dockets', fireAuth, getUserDockets);
userRouter.post('/dockets/:docketId', fireAuth, saveDocketToUser);
userRouter.delete('/dockets/:docketId', fireAuth, removeDocketFromUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/cl', clRouter);

export default baseRouter;
