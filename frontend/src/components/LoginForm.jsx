import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../App';
import { Button, Center, Input, VStack } from '@chakra-ui/react';

function LoginForm() {
    const emailLogin = async (e, p) => {
        await signInWithEmailAndPassword(auth, e, p);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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