import { Box, Flex, Text } from '@chakra-ui/react';
import ContactBar from './ContactBar';
import React, { useState } from 'react';
import ChatLog from './ChatLog';

function ChatView() {
    const [selContact, setSelContact] = useState("");

    return (
        <Flex h='95vh'>
            <Box
                flex='1'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
            >
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