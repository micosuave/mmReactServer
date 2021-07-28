import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { signupUser, loginUser, getUserDockets, saveDocketToUser, removeDocketFromUser } from './User';
import fireAuth from '../util/fireAuth';
import https, { RequestOptions } from 'https';

import axios from 'axios';

import { ICLResp } from '../interfaces/ICLResp';
import { IDocket } from '../interfaces/IDocket';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const token = process.env.courtListenerAPItoken;
const pacerUserID = process.env.pacerUserID;
const pacerPassWD = process.env.pacerPassWD;
const urlHost = 'https://www.courtlistener.com';
const apiRoot = urlHost + '/api/rest/v3';

const axiosCL = axios.create({
  baseURL: apiRoot,
  // timeout: 1000,
  headers: {'Authorization': 'Token ' + token }
})
// User-route
// const userRouter = Router();
// userRouter.post('/signup', signupUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/dockets', fireAuth, getUserDockets);
// userRouter.post('/dockets/:docketId', fireAuth, saveDocketToUser);
// userRouter.delete('/dockets/:docketId', fireAuth, removeDocketFromUser);
const upgradeUrl = (urlString: string): string => {
  const reg = new RegExp(/http:/)
    if(reg.test(urlString)){
      return urlString.replace(reg, 'https:')
    } else {
      return urlString
    }
}

// Create Router
const clRouter = Router();

// Add Routes to Router
// Fetch Status
// Fetch PDF
// Fetch PDF Attachments
// Pull from PACER
// Fetch Judge
// Fetch Parties
clRouter.get('/parties/:dnum', fireAuth, (req: Request, res: Response) => {
  const leaf = `?docket__id=${req.params.dnum}&order_by=id`
  const params = {
    params: {
      docket__id: req.params.dnum,
      order_by: 'id'
    }
  }
  const partystem = `/parties/`
  axiosCL.get<ICLResp>(partystem, params)
    .then((resp)=>{
      console.log('status:', resp.status, resp.statusText);
      return res.status(resp.status).json(resp.data)
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({error: err.message})
    })
})
// Fetch Attorneys
clRouter.get('/attorneys/:dnum', fireAuth, (req: Request, res: Response) => {
  const leaf = `?docket__id=${req.params.dnum}&order_by=id`
  const params = {
    params: {
      docket__id: req.params.dnum,
      order_by: 'id'
    }
  }
  const partystem = `/attorneys/`
  axiosCL.get<ICLResp>(partystem, params)
    .then((resp)=>{
      console.log('status:', resp.status, resp.statusText);
      return res.status(resp.status).json(resp.data)
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({error: err.message})
    })
})
// Fetch Entries
// Fetch Docket
clRouter.get('/dockets/:dnum', fireAuth, (req: Request, res: Response)=>{
  const dockstem = '/dockets/'+ req.params.dnum;
  axiosCL.get<IDocket>(dockstem)
    .then((resp)=>{
       console.log('status:', resp.status, resp.statusText);
       return res.status(resp.status).json(resp.data)
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({error: err.message})
    })
})
// Search Courts
clRouter.get('/search/:dnum/court/:courtId', fireAuth, (req: Request, res: Response) => {
   const stem2 = `/dockets/?docket_number__startswith=${req.params.dnum}&court__id=${req.params.courtId}`;

   axiosCL.get<ICLResp>(stem2)
   .then((resp)=>{
      console.log('status:', resp.status, resp.statusText);
      return res.status(resp.status).json(resp.data)
   })
   .catch((err) => {
     console.error(err);
     return res.status(500).json({error: err.message})
   })
})

// Export the router
export default clRouter;
