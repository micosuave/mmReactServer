"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDocketFromUser = exports.saveDocketToUser = exports.getUserDockets = exports.loginUser = exports.signupUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const admin_1 = require("../util/admin");
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
// Helper Functions
const isEmpty = (string) => {
    if (string.trim() === '')
        return true;
    else
        return false;
};
const isEmail = (email) => {
    const re = 
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
/**
 * SignUp a user.
 *
 * @param req
 * @param res
 * @returns
 */
function signupUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let token, userId;
        console.log(req.body);
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            handle: req.body.handle
        };
        // Finds the validation errors in this request
        // and wraps them in an object with handy functions
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const errors = {};
        if (isEmpty(newUser.email)) {
            errors.email = "Must not be empty";
        }
        else if (!isEmail(newUser.email)) {
            errors.email = "Must be a valid email address";
        }
        if (isEmpty(newUser.password))
            errors.password = "Must not be empty";
        if (newUser.password !== newUser.confirmPassword) {
            errors.confirmPassword = "Passwords must match";
        }
        if (isEmpty(newUser.handle))
            errors.handle = "Must not be empty";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        admin_1.db.ref(`/users/${newUser.handle}`).get()
            .then(doc => {
            if (doc.exists()) {
                return res.status(400).json({ message: 'This handle is already taken' });
            } // else {
            return admin_1.fireBase.auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then((data) => {
                if (data.user !== null) {
                    userId = data.user.uid;
                    return data.user.getIdToken();
                }
                else {
                    throw (new Error('null'));
                }
                // return res.status(201).json({ message: `user ${data.user.uid}` })
            })
                .then((returntoken) => {
                token = returntoken;
                const userCredentials = {
                    email: newUser.email,
                    handle: newUser.handle,
                    createdAt: new Date().toISOString(),
                    userId
                };
                const ref1 = admin_1.db.ref(`/users/${userId}`);
                const ref2 = admin_1.db.ref(`/users/${newUser.handle}`);
                return Promise.all([ref1.set(userCredentials), ref2.set(userCredentials)]);
            })
                .then(() => {
                return res.status(201).json({ token });
            });
            // }
        })
            .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email already in use' });
            }
            return res.status(500).json({ error: err.code });
        });
    });
}
exports.signupUser = signupUser;
/**
 * LogIn a user.
 *
 * @param req
 * @param res
 * @returns
 */
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        const errors = {};
        // console.log(user)  // Debug Only
        if (isEmpty(user.email))
            errors.email = "Must not be empty";
        if (isEmpty(user.password))
            errors.password = "Must not be empty";
        // console.log(Object.keys(errors).length)
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        admin_1.fireBase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
            if (data && data.user !== null)
                return data.user.getIdToken();
            else
                return '';
        })
            .then((rToken) => {
            return res.json({ token: rToken });
        })
            .catch((err) => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(403).json({ general: 'Wrong credentials please try again' });
            }
            return res.status(500).json({ error: err.code });
        });
    });
}
exports.loginUser = loginUser;
/**
 * Return a users saved dockets.
 *
 * @param req
 * @param res
 * @returns
 */
function getUserDockets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        admin_1.db.ref(`/docketlists/${req.user ? req.user.uid : ''}`).get()
            .then((rDoc) => {
            const dockets = rDoc.val();
            return res.status(200).json({ dockets });
        });
    });
}
exports.getUserDockets = getUserDockets;
/**
 * Save a docket to a user.
 * TODO validation
 *
 * @param req
 * @param res
 * @returns
 */
function saveDocketToUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { docket } = req.body;
        if (!docket) {
            return res.status(BAD_REQUEST).json({
                error: "Parameter Docket is missing",
            });
        }
        // const errors = validationResult(req);
        //   if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        //   }
        // const docket = JSON.parse(req.body.docket)
        console.log(docket);
        admin_1.db.ref(`/docketlists/${req.user ? req.user.uid : ''}/${req.params.docketId}`)
            .set(docket)
            .then(ref => {
            return res.status(201).json({ message: 'Docket saved to List' });
        })
            .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
    });
}
exports.saveDocketToUser = saveDocketToUser;
/**
 * Remove a docket from a users list.
 * TODO validation
 *
 * @param req
 * @param res
 * @returns
 */
function removeDocketFromUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        admin_1.db.ref(`/docketlists/${req.user ? req.user.uid : ''}/${req.params.docketId}`)
            .remove()
            .then(ref => {
            return res.status(200).json({ message: 'Docket Successfully Deleted' });
        })
            .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
    });
}
exports.removeDocketFromUser = removeDocketFromUser;
