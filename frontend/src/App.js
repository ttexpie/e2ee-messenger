import { Box, Center, ChakraProvider, Heading } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatView from './components/ChatView';
import LoginForm from './components/LoginForm';

const { REACT_APP_FIREBASE_KEY } = process.env;
console.log(process.env);

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: "e2ee-messenger-8ac87.firebaseapp.com",
  databaseURL: "https://e2ee-messenger-8ac87-default-rtdb.firebaseio.com",
  projectId: "e2ee-messenger-8ac87",
  storageBucket: "e2ee-messenger-8ac87.appspot.com",
  messagingSenderId: "147234113428",
  appId: "1:147234113428:web:720979bb9e6d68029e7181",
  measurementId: "G-J3XXW8NNMC"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function checkUser(uid, email) {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        console.log("user document doesn't exist, creating one");
        await setDoc(doc(db, "users", uid), {
          email: email
        });
      }
      else {
        console.log("user document exists, logging in...")
      }
    }

    if (user != null) {
      checkUser(user.uid, user.email);
    }
  }, [user]);

  return (
    <ChakraProvider>
      <Center h='5vh'>
        <Heading size='lg'>StudyFind Messenger</Heading>
      </Center>
      <Box direction='column'>
        {user ? <ChatView /> : <LoginForm />}
      </Box>
    </ChakraProvider>
  );
}

export default App;