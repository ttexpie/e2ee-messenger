import { getAuth, signOut } from 'firebase/auth';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import ContactBar from './ContactBar';
import React from 'react';

function ChatView() {
    const auth = getAuth();
    return (
        <Flex>
            <Box
                flex='1'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
            >
                <Button onClick={() => signOut(auth)}>Sign Out</Button>
                <ContactBar />
            </Box>
            <Box 
                flex='2'
                border='2px'
                borderRadius='2xl'
                borderColor='gray.100'
            >
                <Text>Chat goes here</Text>
            </Box>
        </Flex>
    );
}

export default ChatView;