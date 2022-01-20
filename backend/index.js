const express = require('express');
const app = express();

app.get('/', function(req, res) {
    return; //database GET code here
});

app.post('/', function(req, res) {
    return; //database POST code here
});

app.listen(3000, () => 
    console.log("Listening on port 3000."),
);