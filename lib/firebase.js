import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
	getStorage,
	ref as storageRef,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Your Realtime Database URL
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Storage
const db = getDatabase(app);
const storage = getStorage(app);

// Export the necessary functions
export { db, storage, storageRef, uploadBytesResumable, getDownloadURL };
