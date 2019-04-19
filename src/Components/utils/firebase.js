import firebase from "firebase/app";
import "firebase/auth";

const CONFIG = {
    apiKey: "AIzaSyArrokhuYfs5rPYBjqQmY3K9DeRHxLThBg",
    authDomain: "codeshack-2a355.firebaseapp.com",
    databaseURL: "https://codeshack-2a355.firebaseio.com",
    projectId: "codeshack-2a355",
    storageBucket: "codeshack-2a355.appspot.com"
};

firebase.initializeApp(CONFIG);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
