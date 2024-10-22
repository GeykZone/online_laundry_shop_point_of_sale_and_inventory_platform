// firebase-module.js (module file)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-vr5_3GReDmBVcr2KLIza12Crw1W4Olw",
  authDomain: "onlinelaundryshoppos.firebaseapp.com",
  projectId: "onlinelaundryshoppos",
  storageBucket: "onlinelaundryshoppos.appspot.com",
  messagingSenderId: "358981517507",
  appId: "1:358981517507:web:ae352f2cf265f0d78a6276",
  measurementId: "G-6ZQYE8G3FB"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Expose storage to the global window object
window.firebaseStorage = storage;
