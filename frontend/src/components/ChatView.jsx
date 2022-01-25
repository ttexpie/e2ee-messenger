import { signOut } from 'firebase/auth';
import { auth } from '../App';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import ContactBar from './ContactBar';

function ChatView() {
    return (
        <Box w='25%' direction='column'>
            <Text>Successfully logged in</Text>
            <Button onClick={() => signOut(auth)}>Sign Out</Button>
            <ContactBar />
        </Box>
    );
}

export default ChatView;