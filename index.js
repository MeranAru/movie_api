const express = require('express'),
    morgan = require('morgan'),
    //import built in node modules fs and path
    fs = require('fs'),
    path = require('path');
const { Stream } = require('stream');
    const app = express();
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

    //send all files automatically to the public folder
    app.use(express.static('public'));
    //setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));

let topMovies = [
    {
        title: 'Fast and the Furious',
        year: '2009'
    },
    {
        title: 'Avengers: Endgame',
        year: '2019'
    },
    {
        title: 'Spider-Man: No way Home',
        year: '2021'
    },
    {
        title: 'The Dark Knight',
        year: '2008'
    },
    {
        title: 'The Matrix',
        year: '1999'
    },
    {
        title: 'Joker',
        year: '2019'
    },
    {
        title: 'John Wick: Chapter 4',
        year: '2023'
    },
    {
        title: 'Get Out',
        year: '2017'
    },
    {
        title: 'IT',
        year: '2017',
    },
    {
        title: 'Insidious',
        year: '2010'
    }
];

//Get requests
app.get('/', (req,res) => {
    res.send('Welcome to my movie club!');
});

app.get('/documentation', (req,res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

app.get('/movies', (req,res) => {
    res.json(topMovies);
});

//Error code that detects errors above
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for Requests
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080')
});
