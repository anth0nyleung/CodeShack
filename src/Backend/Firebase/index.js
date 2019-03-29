import Firebase from './firebase'

const firebase = {
    initializeFirebase() {
        this.fb = new Firebase();
    },

    getFirebase() {
        return this.fb;
    }
}

export default firebase;