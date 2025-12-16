// 1- importing the necessary Firebase modules to set up authentication in a React application
import { initializeApp } from 'firebase/app'; // initializes the Firebase app with the provided configuration
import {
  getAuth, //get the firebase instance we are working with
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // this is used to listen for changes in the authentication state of the user, it will be useful to check if the user is signed in or not (firebase will automatically handle the authentication state for us)
} from 'firebase/auth'; // imports the Firebase Authentication service

import {
  getFirestore,
  doc, //get a reference to a document in the Firestore database
  getDoc, // retrieves a document from the Firestore database
  setDoc, // sets a document in the Firestore database
  collection, // gets a reference to a collection in the Firestore database
  writeBatch, // handle transactions; creates a write batch object for performing multiple write operations
  query,
  getDocs,
} from 'firebase/firestore'; // imports the Firestore database service

// Firebase configuration object containing the necessary keys and identifiers for your Firebase project and it's obtained from the Firebase console(online)
// Your web app's Firebase configuration which is part of the Firebase project settings, it contains the API key, project ID, and other identifiers that allow your app to connect to Firebase services.
// You can find this configuration in your Firebase console under Project Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: 'AIzaSyBWacRUv0s4rgsGdVSNGzQby8pa6NE58IA',
  authDomain: 'seven7digit-clothing-db.firebaseapp.com',
  projectId: 'seven7digit-clothing-db',
  storageBucket: 'seven7digit-clothing-db.firebasestorage.app',
  messagingSenderId: '508225688763',
  appId: '1:508225688763:web:44a8131e93307f27e1059e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // initializes the Firebase app with the provided configuration object, this is the first step to use Firebase services in your app, it creates a Firebase app instance that can be used to access Firebase services like Authentication, Firestore, etc.

const googleProvider = new GoogleAuthProvider(); // creates a new instance of the GoogleAuthProvider class, which is used to authenticate users with their Google accounts, we can also use other providers like Facebook, Twitter, etc.
googleProvider.setCustomParameters({
  prompt: 'select_account',
}); // sets the custom parameters for the Google authentication provider, in this case, it prompts the user to select an account
export const auth = getAuth(firebaseApp); // gets the Firebase Authentication instance
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, googleProvider); // exports a function that allows users to sign in with a Google popup window
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); // exports a function that allows users to sign in with a Google redirect, which means the user will be redirected to the Google sign-in page and then back to your app after authentication

//now go online and create a new project in Firebase console
//https://console.firebase.google.com/u/0/project/seven7digit-clothing-db/authentication/providers

// Initialize Firestore
export const db = getFirestore(firebaseApp); // gets the Firestore database instance, which is used to interact with the Firestore database, this is the second step to use Firestore services in your app, it creates a Firestore instance that can be used to access Firestore collections and documents
//down below, collectionKey is the name of the collection. if the collection doesn't exist , it will be created
//objectsToAdd are documents or records in SQL database jargon

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // gets a reference to the collection in the Firestore database
  const batch = writeBatch(db); // creates a write batch object for performing multiple write operations, handling therefore transactions

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase()); // creates a reference to the document in the collection
    batch.set(docRef, obj); //instanciationof a class // adds a set operation to the batch for the document
  });

  await batch.commit(); // commits the batch write operation
  console.log('done');
};

// getdocuments data from firestore

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef); // querying
  const querySnapshot = await getDocs(q); // getting documents from categories collection
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()); //returns an array of category objects
  /*   const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {}); */
  //return categoriesMap;
};
// end getting documents from firestore

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return; // checks if the userAuth object is provided, if not, it returns undefined
  //console.log(userAuth);
  const userDocRef = doc(db, 'users', userAuth.uid); // creates a reference to the user document in the Firestore database using the user's unique ID, even if the document does not exist yet, google will still create a reference, just to make sure next time, google will keep the reference.
  //console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef); // retrieves the document snapshot from the Firestore database using the user document reference
  //console.log(userSnapshot.exists()); // checks if the document exists in the Firestore database, by default it will return false, because the document does not exist yet, but it will create a reference to the document in the Firestore database

  if (!userSnapshot.exists()) {
    // if the document does not exist, it means the user is signing up for the first time
    const { displayName, email } = userAuth; // destructures the displayName and email from the userAuth object
    const createdAt = new Date(); // creates a new date object to store the current date and time
    try {
      await setDoc(userDocRef, {
        // sets the document in the Firestore database with the user's information
        displayName,
        email,
        createdAt,
        ...additionalInformation, // spreads any additional information passed to the function into the document, because createAuthUserWithEmailAndPassword function does not return the displayName, so we need to pass it as an additional information
      });
      //console.log("user created successfully"); // logs a success message if the document is created successfully
    } catch (error) {
      console.log('error creating the user', error.message); // logs any errors that occur while setting the document
    }
  }
  return userSnapshot; // returns the user document reference, which can be used to access the user's document in the Firestore database
};
// creating a user in fireBase "Authentication Tab", then the observer  "onAuthStateChanged" will be triggered and save the user in "users" collection (firestore Database Tab)
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // checks if the email and password are provided, if not, it returns undefined
  return await createUserWithEmailAndPassword(auth, email, password); // creates a new user with the provided email and password using Firebase Authentication
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // checks if the email and password are provided, if not, it returns undefined
  return await signInWithEmailAndPassword(auth, email, password); // creates a new user with the provided email and password using Firebase Authentication
};

export const signOutUser = async () => await signOut(auth); // exports a function that allows users to sign out of their account, it uses the Firebase Authentication signOut method

/*
no longer needed as we will rewrite it as getCurrentUser, sa saga can leverage it
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); // open listener ===exports a function that allows you to listen for changes in the authentication state of the user and execute a callback function when the authentication state changes, this is useful to check if the user is signed in or not, and update the UI accordingly
*/
// rewriting of onAuthStateChangedListener, so it can be used with redux-saga

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        // Resolve the promise with the user object (or null if logged out)
        resolve(userAuth);
        // Immediately unsubscribe after the first state change is received.
        unsubscribe();
      },
      (error) => {
        // Reject the promise if an error occurs during authentication state changes.
        reject(error);
        // Unsubscribe in case of an error as well.
        unsubscribe();
      }
    );
  });
};
