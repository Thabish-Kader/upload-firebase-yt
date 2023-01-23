// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDQ9YHkF63F3QvHDjK3fhWzTh_Mv8rC7ZA",
	authDomain: "fir-yt-6b7e9.firebaseapp.com",
	projectId: "fir-yt-6b7e9",
	storageBucket: "fir-yt-6b7e9.appspot.com",
	messagingSenderId: "997920431764",
	appId: "1:997920431764:web:9502a9656fcfafb0bade81",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
