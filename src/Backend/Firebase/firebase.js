import app from 'firebase/app';
import 'firebase/auth'

const CONFIG = {
    apiKey: "AIzaSyArrokhuYfs5rPYBjqQmY3K9DeRHxLThBg",
    authDomain: "codeshack-2a355.firebaseapp.com",
    databaseURL: "https://codeshack-2a355.firebaseio.com",
    projectId: "codeshack-2a355",
    storageBucket: "codeshack-2a355.appspot.com",
    messagingSenderId: "220351087002"
  };

class Firebase {

    constructor() {
        app.initializeApp(CONFIG);

        this.auth = app.auth();
        this.provider = new app.auth.GoogleAuthProvider();

    }

    logInWithWiscID = (callback) => {
        console.log("firebase login");
        this.auth.signInWithPopup(this.provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            callback(user);

          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
    
          });
    }

    logOut = () => this.auth.signOut();

    

}

export default Firebase;