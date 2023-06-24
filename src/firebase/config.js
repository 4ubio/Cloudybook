import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
  
const FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cloudybook-1.firebaseapp.com",
  projectId: "cloudybook-1",
  storageBucket: "cloudybook-1.appspot.com",
  messagingSenderId: "646191504093",
  appId: "1:646191504093:web:4ac64762abde44fa3d9934"
};

const FirebaseApp = initializeApp(FirebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);