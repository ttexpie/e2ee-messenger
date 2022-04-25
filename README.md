# End-to-End Encrypted Messenger

This is the end-to-end encrypted messenger that implements the Diffie Hellman algorithm. This repository includes an example of frontend UI
and the main firebase cloud functions tools to perform the key exchange.

##Installation:
1. Clone Repository
2. `npm install` in both `/functions` and `/frontend`
3. Make sure if using frontend web server to put firebase key in `.env` file

You can do quick testing for the cloud functions using these links:  
https://us-central1-e2ee-messenger-8ac87.cloudfunctions.net/generateKeys  
https://us-central1-e2ee-messenger-8ac87.cloudfunctions.net/testKeyExchange

## Release Notes - April 15, 2022:  
### New and Improved  
1. Can add new contacts
2. Added more chat elements
3. Adding messages
4. Selecting contact
5. Contact bar  
### Issues  
Encryption not fully implemented in frontend  
### Fixes  
Fixed NaN issue with encryption

<sub><sub>Release 5.25<sub><sub>
