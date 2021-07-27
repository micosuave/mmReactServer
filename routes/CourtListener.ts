import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { signupUser, loginUser, getUserDockets, saveDocketToUser, removeDocketFromUser } from './User';
import fireAuth from '../util/fireAuth';
import https, { RequestOptions } from 'https';
import { ICLResp } from '../interfaces/ICLResp';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const token = process.env.courtListenerAPItoken;
const pacerUserID = process.env.pacerUserID;
const pacerPassWD = process.env.pacerPassWD;
const urlHost = 'https://www.courtlistener.com';
const apiRoot = urlHost + '/api/rest/v3';

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
// Fetch Attorneys
// Fetch Entries
// Fetch Docket
// Search Courts
clRouter.get('/search/:dnum/court/:courtId', fireAuth, (req: Request, res: Response) => {
   const stem2 = `/dockets/?docket_number__startswith=${req.params.dnum}&court__id=${req.params.courtId}`;
   const fetchSource = apiRoot + stem2;
   const options: RequestOptions = {
     headers:{  Authorization: 'Token ' + token}
   }
   let resData: any;
   https.get(fetchSource, options, (clres) => {
      console.log('statusCode:', clres.statusCode);
      // console.log('headers:', clres.headers);

      clres.on('data', (d) => {
        if(resData !== undefined) resData = resData + d;
        else resData = d
        // process.stdout.write(d);
      });
      clres.on('end', ()=> {
        res.status(200).json(JSON.parse(resData));
      })

    }).on('error', (e) => {
      console.error(e);
      res.status(500).json({error: e.message})
    });
})
// Fetch Dockets

// Export the router
export default clRouter;
