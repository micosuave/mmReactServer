"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Server"));
// const app = express();
const port = process.env.port || 3000;
Server_1.default.get('/', (req, res) => {
    res.send('Well done!');
});
Server_1.default.listen(port, () => {
    console.log(`Motion Maker Typescript Server application is running on port ${port}.`);
    console.log(`PM2 var is ${process.env.pm2}`);
});
exports.default = Server_1.default;
