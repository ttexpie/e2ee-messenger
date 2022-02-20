const functions = require("firebase-functions");
const DiffieHellman = require("./dh.js");

const admin = require("firebase-admin");
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
      .firestore()
      .collection("messages")
      .add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates
// an uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document("/messages/{documentId}")
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks inside a
      // Functions such as writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });

exports.generateKeys = functions.https.onRequest((req, res) => {
  const dh = new DiffieHellman();
  const privateKey = dh.getPrivateKey();
  const publicKey = dh.generatePublicKey();

  res.json({"privateKey": privateKey, "publicKey": publicKey});
});

exports.generateSharedKey = functions.https.onRequest((req, res) => {
  const dh = new DiffieHellman();
  try {
    const localPrivateKey = req.query.private;
    const remotePublcKey = req.query.public;
    const sharedKey = dh.generateSharedKeyStatic(localPrivateKey,
        remotePublcKey);
    return res.json({"shared key": sharedKey});
  } catch (error) {
    return res.json({"message": "Invalid public key."});
  }
});

exports.testKeyExchange = functions.https.onRequest((req, res) => {
  const user1 = new DiffieHellman();
  const user2 = new DiffieHellman();

  const private1 = user1.getPrivateKey();
  const public1 = user1.generatePublicKey();

  const private2 = user2.getPrivateKey();
  const public2 = user2.generatePublicKey();

  const shared1 = user1.generateSharedKey(public2);
  const shared2 = user2.generateSharedKey(public1);

  const ifEqual = shared1 == shared2;

  return res.json(
      {
        "user1": {
          "private": private1,
          "public": public1,
          "shared": shared1,
        },
        "user2": {
          "private": private2,
          "public": public2,
          "shared": shared2,
        },
        "equal": ifEqual,
      }
  );
});
