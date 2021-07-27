"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const fireAuth = (req, res, next) => {
    try {
        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            idToken = req.headers.authorization.split('Bearer ')[1].trim();
        }
        else {
            throw Error('No Token Found');
        }
        // ng2-file-upload workaround
        const lastChar = idToken[idToken.length - 1];
        // console.log(lastChar)
        if (lastChar === ',') {
            idToken = idToken.slice(0, idToken.length - 1);
        }
        admin_1.fireApp.auth().verifyIdToken(idToken)
            .then(decodedToken => {
            req.user = decodedToken;
            // req.signedCookies= decodedToken;
            console.log('hello ' + req.user.email);
            return admin_1.db.ref(`/users/${req.user.uid}`).get();
        })
            .then((userDoc) => {
            const data = userDoc.val();
            const handle = data.handle;
            console.log(handle);
            if (req.user)
                req.user.handle = handle;
            next();
        })
            .catch(err => {
            console.error(err);
            res.status(403).json({ error: err.code });
        });
    }
    catch (err) {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }
};
exports.default = fireAuth;
