import { Box, Button, Flex, FormControl, Input, InputGroup, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, getFirestore, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { app } from '../App';
import { getAuth } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatLog = (props) => {
    const [formValue, setFormValue] = useState("");
    const db = getFirestore(app);
    const auth = getAuth(app);

    const dummy = useRef();
    const messageRef = collection(db, "chats/" + props.selContact + "/messages");
    console.log(messageRef.path);
    const q = query(messageRef, orderBy("time"), limit(25));

    const [messages] = useCollectionData(q);
    console.log(messages);

    const Message = (props) => {
        const {message, user} = props.message;

        if (auth.currentUser.uid === user) {
            return (
                <Box>
                    <Text>{message}</Text>
                </Box>
            );
        }
        else {
            return (
                <Box>
                    <Text>{message}</Text>
                </Box>
            )
        }
    }
    
    const sendMessage = async (e) => {
        console.log("sending message");
        e.preventDefault();

        await addDoc(messageRef, {
            message: formValue,
            time: serverTimestamp(),
            user: auth.currentUser.uid
        });

        setFormValue("");
        dummy.current.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            <Box
                h='95%'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
            >
                {messages && messages.map((msg, index) => <Message key={index} message={msg} />)}

                <span ref={dummy}></span>
            </Box>
            <Box
                h='5%'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
            >
                <InputGroup >  
                    <Input 
                        value={formValue} 
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder='type message here'
                    />
                    <Button
                        colorScheme='blue'
                        disabled={!formValue}
                        type='submit'
                        onSubmit={sendMessage}
                    >
                        Send
                    </Button>
                </InputGroup>
            </Box>
        </>
    );
}

export default ChatLog;