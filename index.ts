import express, { Request, Response, NextFunction } from 'express';
import app from './Server';
// const app = express();
const port = process.env.port || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})



app.listen(port, () => {
  console.log(`Motion Maker Typescript Server application is running on port ${port}.`);
  console.log(`PM2 var is ${process.env.pm2}`);
});

export default app;
