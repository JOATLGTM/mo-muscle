import { initializeApp } from "firebase/app";
import {
	getDatabase,
	ref,
	set,
	get,
	child,
	remove,
	update,
} from "firebase/database";
import {
	getStorage,
	ref as storageRef,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDYpnEPU2UAXtH9VhCy4Ijdosr9QtWDxeA",
	authDomain: "momuscle-6a177.firebaseapp.com",
	projectId: "momuscle-6a177",
	databaseURL: "https://momuscle-6a177-default-rtdb.firebaseio.com", // Your Realtime Database URL
	storageBucket: "momuscle-6a177.firebasestorage.app",
	messagingSenderId: "940303263535",
	appId: "1:940303263535:web:307a37988f44d68c0623da",
	measurementId: "G-5VMD6KGRBT",
};

// const firebaseConfig = {
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.FIREBASE_PROJECT_ID,
// 	databaseURL: process.env.FIREBASE_DATABASE_URL,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
// 	appId: process.env.FIREBASE_APP_ID,
// 	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Storage
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };
