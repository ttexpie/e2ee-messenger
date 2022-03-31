import { getAuth, signOut } from 'firebase/auth';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import ContactBar from './ContactBar';
import React, { useState } from 'react';
import Chat from './Chat';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

function ChatView() {
    const [selContact, setSelContact] = useState('');

    const auth = getAuth();

    return (
        <Flex h='95vh'>
            <Box
                flex='1'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
            >
                <Button onClick={() => signOut(auth)}>Sign Out</Button>
                <ContactBar selContact={selContact} setSelContact={setSelContact} />
            </Box>

            <Flex 
                w='65%'
                flexDirection='column'
            >
                <ChatLog />
                <ChatInput />
            </Flex>
        </Flex>
    );
}

export default ChatView;