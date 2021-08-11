import 'firebase'
import store from "./store"
import firebase from "firebase";

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyAavAT5AkZWthkAAv7XN66VsWhkBBAFvck",
    authDomain: "activity-monitor-d8f7c.firebaseapp.com",
    projectId: "activity-monitor-d8f7c",
    storageBucket: "activity-monitor-d8f7c.appspot.com",
    messagingSenderId: "579187155178",
    appId: "1:579187155178:web:8b650300e24ad5984ef793",
    measurementId: "G-002TZ1LYKV"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
    console.log("user -> ", user)
    store.dispatch("setUser", user);
});

export const getCurrentUserFirebase = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

// utils
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

// collection references
export const activityCollection = db.collection('activity')
export const monitorCollection = db.collection('monitor')
export const deviceCollection = db.collection('device')
