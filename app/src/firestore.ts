import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC3J2JTvymwlIYXwWmRXOZVzNnlK-zXeWY",
    authDomain: "plantmingle.firebaseapp.com",
    projectId: "plantmingle",
    storageBucket: "plantmingle.appspot.com",
    messagingSenderId: "178525585163",
    appId: "1:178525585163:web:53c47da099cd413ffa2c0e",
    measurementId: "G-DKXBEZZJJ3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
