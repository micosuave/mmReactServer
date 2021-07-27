"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fireAuth_1 = __importDefault(require("../util/fireAuth"));
const https_1 = __importDefault(require("https"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
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
const upgradeUrl = (urlString) => {
    const reg = new RegExp(/http:/);
    if (reg.test(urlString)) {
        return urlString.replace(reg, 'https:');
    }
    else {
        return urlString;
    }
};
// Create Router
const clRouter = express_1.Router();
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
clRouter.get('/search/:dnum/court/:courtId', fireAuth_1.default, (req, res) => {
    const stem2 = `/dockets/?docket_number__startswith=${req.params.dnum}&court__id=${req.params.courtId}`;
    const fetchSource = apiRoot + stem2;
    const options = {
        headers: { Authorization: 'Token ' + token }
    };
    let resData;
    https_1.default.get(fetchSource, options, (clres) => {
        console.log('statusCode:', clres.statusCode);
        // console.log('headers:', clres.headers);
        clres.on('data', (d) => {
            if (resData !== undefined)
                resData = resData + d;
            else
                resData = d;
            // process.stdout.write(d);
        });
        clres.on('end', () => {
            res.status(200).json(JSON.parse(resData));
        });
    }).on('error', (e) => {
        console.error(e);
    });
});
// Fetch Dockets
// Export the router
exports.default = clRouter;
