import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHi0quHsP-qV8H3xTF7r2RKfrisDJtjVM",
  authDomain: "reset-senha-ldap.firebaseapp.com",
  projectId: "reset-senha-ldap",
  storageBucket: "reset-senha-ldap.appspot.com",
  messagingSenderId: "268223356586",
  appId: "1:268223356586:web:06e8e337bdd9b51ee5fad3",
  measurementId: "G-DF8WWXJNDC"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = () => firebase.auth()
const output = {firebase, firebaseConfig, auth}

export default output