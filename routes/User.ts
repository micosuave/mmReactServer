import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { db, fireBase } from '../util/admin';
import { FirebaseError } from 'firebase-admin';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

// Helper Functions
const isEmpty = (string: string) => {
    if (string.trim() === '') return true
    else return false
}
const isEmail = (email: string) => {
  const re =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
interface credentials {
  email: string,
  password: string,
  confirmPassword: string,
  handle: string
}

/**
 * SignUp a user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function signupUser(req: Request, res: Response) {
        let token: string, userId: string;
        const newUser: credentials = {
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                handle: req.body.handle
            }
            // Finds the validation errors in this request
            // and wraps them in an object with handy functions
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
        const errors: any = {};

        if (isEmpty(newUser.email)) {
            errors.email = "Must not be empty"
        } else if (!isEmail(newUser.email)) {
            errors.email = "Must be a valid email address"
        }
        if (isEmpty(newUser.password)) errors.password = "Must not be empty"
        if (newUser.password !== newUser.confirmPassword){
         errors.confirmPassword = "Passwords must match"
        }
        if (isEmpty(newUser.handle)) errors.handle = "Must not be empty"

        if (Object.keys(errors).length > 0) return res.status(400).json(errors)

        db.ref(`/users/${newUser.handle}`).get()
            .then(doc => {
                if (doc.exists()) {
                    return res.status(400).json({ handle: 'This handle is already taken' })
                } // else {
                  return fireBase.auth()
                  .createUserWithEmailAndPassword(newUser.email, newUser.password )
                  .then(
                (data) => {
                  if(data.user !== null){
                    userId = data.user.uid
                    return data.user.getIdToken()
                  }else{
                    throw(new Error('null'))
                  }

                        // return res.status(201).json({ message: `user ${data.user.uid}` })
                }
            )
            .then((returntoken) => {
                token = returntoken;
                const userCredentials = {
                    email: newUser.email,
                    handle: newUser.handle,
                    createdAt: new Date().toISOString(),
                    userId
                }
                const ref1 = db.ref(`/users/${userId}`);
                const ref2 = db.ref(`/users/${newUser.handle}`);
                return Promise.all([ref1.set(userCredentials), ref2.set(userCredentials)])
            })
            .then(() => {
                return res.status(201).json({ token })
            })

                // }
            })

            .catch((err) => {
                console.error(err);
                if (err.code === 'auth/email-already-in-use') {
                    return res.status(400).json({ email: 'Email already in use' })
                }
                return res.status(500).json({ error: err.code })
            })
    }
/**
 * LogIn a user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function loginUser(req: Request, res: Response) {
    const user: { email: string, password: string } = {
        email: req.body.email,
        password: req.body.password
    };
    const errors: any = {};
    console.log(user)
    if (isEmpty(user.email)) errors.email = "Must not be empty";
    if (isEmpty(user.password)) errors.password = "Must not be empty";
    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    fireBase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            if( data && data.user !==null) return data.user.getIdToken()
            else return ''
        })
        .then((rToken: string) => {
            return res.json({ token: rToken })
        })
        .catch((err: FirebaseError) => {
            console.error(err);

            if (err.code === 'auth/wrong-password') {
                return res.status(403).json({ general: 'Wrong credentials please try again' })
            }
            return res.status(500).json({ error: err.code });
        });
}
/**
 * Return a users saved dockets.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUserDockets(req: Request, res: Response) {
    db.ref(`/docketlists/${req.user ? req.user.uid : ''}`).get()
        .then((rDoc) => {
            const dockets = rDoc.val();
            return res.status(200).json({ dockets })
        })
}
/**
 * Save a docket to a user.
 * TODO validation
 *
 * @param req
 * @param res
 * @returns
 */
export async function saveDocketToUser(req: Request, res: Response) {
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
    console.log(docket)
    db.ref(`/docketlists/${ req.user ? req.user.uid : ''}/${req.params.docketId}`)
        .set(docket)
        .then(ref => {
            return res.status(201).json({ message: 'Docket saved to List' })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
}

/**
 * Remove a docket from a users list.
 * TODO validation
 *
 * @param req
 * @param res
 * @returns
 */
export async function removeDocketFromUser(req: Request, res: Response) {
  db.ref(`/docketlists/${req.user ? req.user.uid : ''}/${req.params.docketId}`)
    .remove()
    .then(ref => {
      return res.status(200).json({message: 'Docket Successfully Deleted'})
    })
    .catch( err => {
      console.error(err)
      return res.status(500).json({error: err.code})
    })
}
