import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Center, Input, useToast, VStack } from '@chakra-ui/react';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    const db = getFirestore();
    const toast = useToast();
    const emailLogin = async (e, p) => {
        await signInWithEmailAndPassword(auth, e, p)
            .then((userCredential) => {
                toast({
                    title: 'Successfully logged in',
                    status: 'success',
                    isClosable: 'true',
                });
                if (!localStorage.getItem(auth.currentUser.uid)) {
                    console.log("new login, generating keys");
                    fetch("https://us-central1-e2ee-messenger-8ac87.cloudfunctions.net/generateKeys")
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            localStorage.setItem(auth.currentUser.uid, data.privateKey);
                            setDoc(doc(db, "users", auth.currentUser.uid), { publicKey: data.publicKey }, { merge: true })
                        });
                }
            })
            .catch((error) => {
                toast({
                    title: 'Error! ' + error.code,
                    status: 'error',
                    isClosable: 'true',
                });
            });
    };

    return (
        <Center>
            <VStack
                minW='500px'
                spacing={4}
                padding='5'
                border='2px'
                borderRadius='3xl'
                borderColor='gray.100'
            >
                <Input placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input placeholder='Password' 
                    type='password' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    w='100%'
                    onClick={() => emailLogin(email, password)}
                    disabled={!email || !password}
                >
                    Login
                </Button>
            </VStack>
        </Center>
    );
}

export default LoginForm;