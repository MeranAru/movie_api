const express = require('express'),
    morgan = require('morgan'),
    bodyParser = required('bodyParser'),
    uuid = required('uuid');
    //import built in node modules fs and path
    fs = require('fs'),
    path = require('path');
    // create a write stream(in append mode) 
    //log text file is created in root directory
const { Stream } = require('stream');
    const app = express();
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
    

    //send all files automatically to the public folder
    app.use(express.static('public'));
    //setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));
    app.use(bodyParser.json());

let topMovies = [
    {
        title: 'Fast and the Furious',
        description: 'A police officer decides where his loyalty belongs when he is sent to street racing world to be undercover to destroy.',
        genre: {
            name: 'Action',
            description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        director: {
            name: 'Rob Cohen',
            born: 'March 12, 1949',
            bio: 'Rob Cohen is an American film director, producer and screenwriter.'
        },
    },
    {
        title: 'Avengers: Endgame',
        description: 'Avengers assemble once more to defeat Thanos and to restore the Universe and balance to the world.',
        genre: {
            name: 'Action',
            description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        director: {
            name: 'Anthony Russo',
            born: 'February 3, 1970',
            bio: 'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.'
            },
    },
    {
        title: 'Spider-Man: No way Home',
        description: 'Spider man has got his identity revealed and got help from Doctor Strange. A spell went wrong and dangerous enemies from other worlds start to appear where Peter learns what it means to be Spider-Man.',
        genre: {
            name: 'Action',
            description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        director: {
            name: 'Jon Watts',
            born: 'June 28, 1981',
            bio: 'Jon Watts is an American filmmaker and screenwriter.'
        },
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
