"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const User_1 = require("./User");
const fireAuth_1 = __importDefault(require("../util/fireAuth"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const CourtListener_1 = __importDefault(require("./CourtListener"));
// User-route
const userRouter = express_1.Router();
userRouter.post('/signup', User_1.signupUser);
userRouter.post('/login', User_1.loginUser);
userRouter.get('/dockets', fireAuth_1.default, User_1.getUserDockets);
userRouter.post('/dockets/:docketId', fireAuth_1.default, User_1.saveDocketToUser);
userRouter.delete('/dockets/:docketId', fireAuth_1.default, User_1.removeDocketFromUser);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/cl', CourtListener_1.default);
exports.default = baseRouter;
