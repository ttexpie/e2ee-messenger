import { getAuth, signOut } from 'firebase/auth';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import ContactBar from './ContactBar';
import React, { useState } from 'react';
import Chat from './Chat';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

function ChatView() {
    const [selContact, setSelContact] = useState("");

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

            <Box 
                w='65%'
            >
                {selContact ? <ChatLog selContact={selContact} /> : <Text>Select a conversation</Text> }
            </Box>
        </Flex>
    );
}

export default ChatView;