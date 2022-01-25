import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getDatabase, onChildAdded, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from "react";

function ContactBar() {
    const auth = getAuth();
    const database = getDatabase();
    const [contactList, setContactList] = useState([]);

    const addContact = (k, n, r) => {
        setContactList(contactList => [...contactList, {key: k, name: n, recent: r}]);
    }

    console.log('users/' + auth.currentUser.uid + '/contacts');
    const contactListRef = ref(database, 'users/' + auth.currentUser.uid + '/contacts');

    useEffect(() => {
        onChildAdded(contactListRef, (data) => {
            addContact(data.key, data.val(), 'recent message goes here')
        });
    }, []);

    return contactList.map((contact, index) => {
        return (
            <HStack  key={contact.key} align>
                <Image 
                    src='http://cdn.onlinewebfonts.com/svg/img_173956.png' 
                    alt='avatar'
                    borderRadius='full'
                    boxSize='100px'
                />
                <VStack>
                    <Heading>{contact.name}</Heading>
                    <Text isTruncated>{contact.recent}</Text>
                </VStack>
            </HStack>
        );
    });
}

export default ContactBar;