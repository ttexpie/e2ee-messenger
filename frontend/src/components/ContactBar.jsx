import { Center, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

function ContactBar() {
    const contacts = [
        {
        name: 'Kyle Mettille',
        avatar: 'http://cdn.onlinewebfonts.com/svg/img_173956.png',
        recent: 'how you are doing today?',
        },
        {
            name: 'Levi Colston',
            avatar: 'http://cdn.onlinewebfonts.com/svg/img_173956.png',
            recent: 'ok, see you then',
        }
    ]

    return contacts.map((contact, index) => {
        return (
            <HStack align>
                <Image 
                    src={contact.avatar} 
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