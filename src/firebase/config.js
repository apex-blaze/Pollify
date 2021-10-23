import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
