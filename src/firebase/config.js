
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAemdh7UBpNqpAFt_nsL5RxdDP688ltnQ",
  authDomain: "linkskuy-355a2.firebaseapp.com",
  projectId: "linkskuy-355a2",
  storageBucket: "linkskuy-355a2.firebasestorage.app",
  messagingSenderId: "895485490048",
  appId: "1:895485490048:web:d267949b34d9d2afc94765",
  measurementId: "G-0H1W3Z8GMP",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
