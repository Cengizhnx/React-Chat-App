import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { login, logout } from "./redux/userSlice";
import { store } from "../src/redux/store";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBA7nqsUa_jy4k1jmryu_drqFpE-v_ayhc",
  authDomain: "react-chat-app-58087.firebaseapp.com",
  projectId: "react-chat-app-58087",
  storageBucket: "react-chat-app-58087.appspot.com",
  messagingSenderId: "20680175013",
  appId: "1:20680175013:web:4d0fe9501704c027178c4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);


// User Phone Register

export const userRegister = async (value) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: "",
      phone_number: value,
      description: "",
      uid: auth.currentUser.uid,
      timeStamp: serverTimestamp()
    });
  } catch (error) {
    toast.error(error.message)
  }
}

export const setUpRecaptcha = (value) => {
  const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, value, recaptchaVerifier)
}

// User Logout

export const userLogout = async () => {
  try {
    await signOut(auth)
    return auth
  } catch (error) {
    toast.error(error.message);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(login(user))
  } else {
    store.dispatch(logout())
  }
})

// User Photo Add

export const getUserPhoto = () => {
  getDownloadURL(ref(storage, `images/users/${auth.currentUser.uid}`))
    .then((url) => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
      return url;
    })
    .catch((error) => {
      toast.error(error.message);
    });
}





