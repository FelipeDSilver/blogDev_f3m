
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyDt1m-XyID9UKzvM9wZv6aPQLg5ZWyTEaA",

  authDomain: "react-basic-felipe.firebaseapp.com",

  projectId: "react-basic-felipe",

  storageBucket: "react-basic-felipe.appspot.com",

  messagingSenderId: "1052181877897",

  appId: "1:1052181877897:web:729c37b5ef66fedb8ca258",

  measurementId: "G-TM0291FCW0"

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};