const express = require('express');
const app = express();

let topBooks = [
    {
        title: 'Harry Pother and the Sorceror Stone',
        author: 'J.K Rowling'
    },
    {
        title: 'Lord of the Rings',
        author: 'J.R.R. Tolkien'
    },
    {
        title: 'Twilight',
        author: 'Stephanie Meyer'
    }
];

let myLogger = (req, res, next) => {
    console.log(req.url);
    next()
};

let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestTime);

//Get Requests
app.get('/', (req, res) => {
    let responseText = 'Welcome to my app!';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});
app.get('/secreturl', (req, res) => {
    let responseText = 'This is a secret url with super top-secret content.';
});

app.get('/', (req,res) => {
    res.send('Welcome to my bookclub!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080')
})

app.get('/documentation', (req,res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

app.get('/books', (req,res) => {
    res.json(topBooks);
});

//listen for Requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080')
})


const http = required('http'),
    url = require('url');

http.createServer((request, response) => {
    let requestURL = url.parse(request.url, true);
    if ( requestURL.pathname == '/documentation.html') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Documentation on the bookclub API.\n');
    }else{
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Welcome to my bookclub!\n');
    }
}) .listen(8080);

console.log('My first Node test server is running on port 8080.');