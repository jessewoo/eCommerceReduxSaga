import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBlK6Bt9mm_Y97ul74QrRBqJ9BJp2koeVM',
  authDomain: 'crwn-db-8c07f.firebaseapp.com',
  databaseURL: 'https://crwn-db-8c07f.firebaseio.com',
  projectId: 'crwn-db-8c07f',
  storageBucket: 'crwn-db-8c07f.appspot.com',
  messagingSenderId: '586540690911',
  appId: '1:586540690911:web:75ee349a7b0cc0b58a286a'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
