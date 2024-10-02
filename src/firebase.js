import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const signIn = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const getPasswords = async () => {
  const user = auth.currentUser;

  if (user) {
    const snapshot = await db.collection('passwords')
      .where('userId', '==', user.uid)
      .get();

    return snapshot.docs.map(doc => doc.data());
  } else {
    console.log('No user is signed in.');
    return [];
  }
};