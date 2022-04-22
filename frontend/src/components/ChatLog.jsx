import { Box, Button, Container, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from '../App';

const ChatLog = (props) => {
    const [formValue, setFormValue] = useState("");
    const db = getFirestore(app);
    const auth = getAuth(app);

    const dummy = useRef();
    const messageRef = collection(db, "chats/" + props.selContact + "/messages");
    console.log(messageRef.path);
    const q = query(messageRef, orderBy("time"));

    const [messages] = useCollectionData(q);
    console.log(messages);

    const Message = (props) => {
        const {message, user} = props.message;

        if (auth.currentUser.uid === user) {
            return (
                <Flex justify='end' p='1'>
                    <Text
                        border='1px'
                        borderRadius='3xl'
                        borderColor='blue.500'
                        bg='blue.500'
                        p='2' 
                        color='white'
                        maxW='container.md'
                    >
                        {message}
                    </Text>
                </Flex>
            );
        }
        else {
            return (
                <Flex p='1'>
                    <Text
                        border='1px'
                        borderRadius='3xl'
                        borderColor='gray.100'
                        bg='gray.100'
                        p='2'
                        maxW='container.md'
                    >
                        {message}
                    </Text>
                </Flex>
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
                h='89vh'
                border='2px' 
                borderRadius='2xl'
                borderColor='gray.100'
                overflowY='auto'
                p='2'
            >
                {messages && messages.map((msg, index) => <Message key={index} message={msg} />)}

                <span ref={dummy}></span>
            </Box>
            <Box>
                <form
                    onSubmit={sendMessage}
                >
                    <InputGroup>
                        <Input
                            value={formValue}
                            onChange={(e) => setFormValue(e.target.value)}
                            placeholder='type message here'
                            type='text'
                        />
                        <Button
                            type='submit'
                            colorScheme='blue'
                            disabled={!formValue}
                        >
                            Send
                        </Button>
                    </InputGroup>
                </form>
            </Box>
        </>
    );
}

export default ChatLog;