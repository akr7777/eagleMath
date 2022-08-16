const express = require('express');
const app = express();
const post = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req:any, res:any) {
    res.send('hello world');
});

export {}