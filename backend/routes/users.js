var express = require('express');
const { auth } = require('firebase-admin');
var router = express.Router();

const createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName
  } = req.body;

  const user = await auth().createUser({
    email,
    password,
    displayName: `${firstName} ${lastName}`
  });

  return res.send(user);
};

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  }
  else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuth = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    }
    catch (e) {
      return res
        .status(401)
        .send({ error: 'You do not have authorization for this request'});
    }
  });
};

router.post('/auth/signup', createUser);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
