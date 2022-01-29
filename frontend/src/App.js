import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatView from './components/ChatView';
import LoginForm from './components/LoginForm';
import { Box, Center, ChakraProvider, Heading } from '@chakra-ui/react';

const firebaseConfig = {
  apiKey: "AIzaSyCDF4Lu7dojtXfPUmMGZ0jnLq1sjd2hVg0",
  authDomain: "e2ee-messenger-8ac87.firebaseapp.com",
  databaseURL: "https://e2ee-messenger-8ac87-default-rtdb.firebaseio.com",
  projectId: "e2ee-messenger-8ac87",
  storageBucket: "e2ee-messenger-8ac87.appspot.com",
  messagingSenderId: "147234113428",
  appId: "1:147234113428:web:720979bb9e6d68029e7181",
  measurementId: "G-J3XXW8NNMC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const url = 'http://localhost:4000/';

function App() {
  //const [test, setTest] = useState('');
  const [user] = useAuthState(auth);

  /*
  const callAPI = () => {
    fetch(url + 'test')
      .then(res => res.text())
      .then(res => setTest(res))
      .catch(err => err);
  }

  useEffect(() => {
    callAPI();
    console.log(test);
  }, []);
  */

  return (
    <ChakraProvider>
      <Center h='5vh'>
        <Heading>StudyFind Messenger</Heading>
      </Center>
      <Box direction='column'>
        {user ? <ChatView /> : <LoginForm />}
      </Box>
    </ChakraProvider>
  );
}

export default App;