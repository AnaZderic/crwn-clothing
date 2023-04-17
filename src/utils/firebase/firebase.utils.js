import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDqyG1gwirfQCxoB2kU7sfUy_XVkh_gnLM",
    authDomain: "crwn-clothing-db-e0d39.firebaseapp.com",
    projectId: "crwn-clothing-db-e0d39",
    storageBucket: "crwn-clothing-db-e0d39.appspot.com",
    messagingSenderId: "288098222420",
    appId: "1:288098222420:web:fbf24132a8fcda62fb48c1"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return; 
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth; 
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('Error creating the user', error.message);
      }
    }
    
    return userDocRef; 

  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; 
    return await createUserWithEmailAndPassword(auth, email, password);
  };