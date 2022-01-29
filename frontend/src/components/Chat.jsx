import { Flex, Spacer, Text } from '@chakra-ui/react';
import {} from 'firebase/database';

function Chat(props) {

    return (
        <Flex 
        flex='2'
        border='2px'
        borderRadius='2xl'
        borderColor='gray.100'
        direction='column'
        >
            <Text>Chat goes here {props.selContact}</Text>
            <Spacer />
            <Text>Message box goes here</Text>
        </Flex>
    );
}

export default Chat;