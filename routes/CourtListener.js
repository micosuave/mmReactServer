"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fireAuth_1 = __importDefault(require("../util/fireAuth"));
const axios_1 = __importDefault(require("axios"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const token = process.env.courtListenerAPItoken;
const pacerUserID = process.env.pacerUserID;
const pacerPassWD = process.env.pacerPassWD;
const urlHost = 'https://www.courtlistener.com';
const apiRoot = urlHost + '/api/rest/v3';
const axiosCL = axios_1.default.create({
    baseURL: apiRoot,
    // timeout: 1000,
    headers: { 'Authorization': 'Token ' + token }
});
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
clRouter.get('/parties/:dnum', fireAuth_1.default, (req, res) => {
    const leaf = `?docket__id=${req.params.dnum}&order_by=id`;
    const params = {
        params: {
            docket__id: req.params.dnum,
            order_by: 'id'
        }
    };
    const partystem = `/parties/`;
    axiosCL.get(partystem, params)
        .then((resp) => {
        console.log('status:', resp.status, resp.statusText);
        return res.status(resp.status).json(resp.data);
    })
        .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
    });
});
// Fetch Attorneys
clRouter.get('/attorneys/:dnum', fireAuth_1.default, (req, res) => {
    const leaf = `?docket__id=${req.params.dnum}&order_by=id`;
    const params = {
        params: {
            docket__id: req.params.dnum,
            order_by: 'id'
        }
    };
    const partystem = `/attorneys/`;
    axiosCL.get(partystem, params)
        .then((resp) => {
        console.log('status:', resp.status, resp.statusText);
        return res.status(resp.status).json(resp.data);
    })
        .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
    });
});
// Fetch Entries
// Fetch any arbitrary CL resource
clRouter.get('/proxy/', fireAuth_1.default, (req, res) => {
    const source = new String(req.query.url).toString();
    // console.log(source)
    // verify its to courtlistener dont want to contact any other server
    if (source.startsWith(urlHost)) {
        axiosCL.get(source)
            .then((resp) => {
            console.log('status:', resp.status, resp.statusText);
            return res.status(resp.status).json(resp.data);
        })
            .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.message });
        });
    }
    else {
        res.status(500).json({ error: 'Not a valid Court Listener URL' });
    }
});
// Fetch Docket
clRouter.get('/dockets/:dnum', fireAuth_1.default, (req, res) => {
    const dockstem = '/dockets/' + req.params.dnum;
    axiosCL.get(dockstem)
        .then((resp) => {
        console.log('status:', resp.status, resp.statusText);
        return res.status(resp.status).json(resp.data);
    })
        .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
    });
});
// Search Courts
clRouter.get('/search/:dnum/court/:courtId', fireAuth_1.default, (req, res) => {
    const stem2 = `/dockets/?docket_number__startswith=${req.params.dnum}&court__id=${req.params.courtId}`;
    axiosCL.get(stem2)
        .then((resp) => {
        console.log('status:', resp.status, resp.statusText);
        return res.status(resp.status).json(resp.data);
    })
        .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.message });
    });
});
// Export the router
exports.default = clRouter;
