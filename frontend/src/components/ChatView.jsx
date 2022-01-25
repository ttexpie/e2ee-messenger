import { signOut } from 'firebase/auth';
import { auth } from '../App';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import ContactBar from './ContactBar';
import React from 'react';

function ChatView() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef();

    return (
        <Box w='25%' direction='column'>
            <Text>Successfully logged in</Text>
            <Button onClick={() => signOut(auth)}>Sign Out</Button>
            <Button onClick={onOpen}>New Contact</Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Contact</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter email for contact</FormLabel>
                            <Input placeholder='Email' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ContactBar />
        </Box>
    );
}

export default ChatView;