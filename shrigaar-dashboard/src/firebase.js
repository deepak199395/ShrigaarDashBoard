import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGHTD8GmhFiFOn0FTdJDMHioDRkeZwd2w",
  authDomain: "shrigaar-dashboard.firebaseapp.com",
  projectId: "shrigaar-dashboard",
  storageBucket: "shrigaar-dashboard.firebasestorage.app",
  messagingSenderId: "646438850978",
  appId: "1:646438850978:web:7cb86a77fbf2f89553e2fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);