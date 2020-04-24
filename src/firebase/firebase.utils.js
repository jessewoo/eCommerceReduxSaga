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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

// DONE ONCE - did all this so we don't have to manually enter each collection and item into Firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  console.log(collectionKey, objectsToAdd);

  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // BATCH RIGHT - batch or group all our calls together into one big request
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});

}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
