import * as admin from 'firebase-admin';
import path from 'path';

import * as serviceAccount from
'../config/serviceAccount.json';
import firebase from 'firebase';
import * as firebaseConfig from '../config/firebaseConfig.json';
const serviceParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
};
const fireParams = {
  apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId
}
export const fireApp = admin.initializeApp({
  credential: admin.credential.cert(serviceParams),
  databaseURL: "https://sizzling-inferno-3215.firebaseio.com"
})
export const db = admin.database();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const fireBase = firebase.initializeApp(fireParams)
