import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut, updateProfile } from "firebase/auth";
import { collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { login, logout } from "./redux/userSlice";
import { store } from "../src/redux/store";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useCollectionData } from 'react-firebase-hooks/firestore';


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

const productConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      ...data
    }

  }
}

export const GetUserProfile = () => {
  const [cart] = useCollectionData(collection(db, "users").withConverter(productConverter))
  return cart;
}

// User Update

export const userUpdate = async (name, phone, desc) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
      phoneNumber: phone,
    })
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      name: name,
      phone_number: phone,
      description: desc,
      timeStamp: serverTimestamp()
    });
    toast.success("Profile Updated")
  } catch (error) {
    toast.error(error.message)
  }
}






