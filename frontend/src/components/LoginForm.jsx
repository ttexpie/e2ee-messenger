import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Center, Input, useToast, VStack } from '@chakra-ui/react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    const toast = useToast();
    const emailLogin = async (e, p) => {
        await signInWithEmailAndPassword(auth, e, p)
            .then((userCredential) => {
                toast({
                    title: 'Successfully logged in',
                    status: 'success',
                    isClosable: 'true',
                });
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
                w='30%'
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