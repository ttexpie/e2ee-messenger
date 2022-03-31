import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { collection, getFirestore, query } from 'firebase/firestore';
import { app } from '../App';

const ChatLog = (props) => {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        const db = getFirestore(app);

        const addMessage = (u, m, t) => {
            setMessageList(messageList => [...messageList, {user: u, message: m, time: t}]);
        };
    }, []);

    return (
        <Box 
            h='95%'
            border='2px' 
            borderRadius='2xl'
            borderColor='gray.100'
        >
            This is a test message
        </Box>
    );
}

export default ChatLog;