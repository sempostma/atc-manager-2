import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAswGyUHm3V-PGNVS7FN-6_adTAJ3Zlw7U",
  authDomain: "atc-manager-2.firebaseapp.com",
  projectId: "atc-manager-2",
  storageBucket: "atc-manager-2.appspot.com",
  messagingSenderId: "569745758303",
  appId: "1:569745758303:web:e89ef0d279d33258c0a3ea"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .doc(user.uid)
      .get();
    if (!query.exists) {
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  auth.signOut();
};
