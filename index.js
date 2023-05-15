const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
    //import built in node modules fs and path
const fs = require('fs');
const path = require('path');
    // create a write stream(in append mode) 
    //log text file is created in root directory
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
    

    //send all files automatically to the public folder
    app.use(express.static('public'));
    //setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));
    app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: 'Steve',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Joe',
        favoriteMovies: ['Avengers:Endgame']
    },
]

let movies = [
    {
        Title: 'Fast and the Furious',
        Description: 'A police officer decides where his loyalty belongs when he is sent to street racing world to be undercover to destroy.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
            Name: 'Rob Cohen',
            Born: 'March 12, 1949',
            Bio: 'Rob Cohen is an American film director, producer and screenwriter.'
        },
    },
    {
        Title: 'Avengers:Endgame',
        Description: 'Avengers assemble once more to defeat Thanos and to restore the Universe and balance to the world.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
            Name: 'Anthony Russo',
            Born: 'February 3, 1970',
            Bio: 'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.'
            },
    },
    {
        Title: 'Spider-Man: No way Home',
        Description: 'Spider man has got his identity revealed and got help from Doctor Strange. A spell went wrong and dangerous enemies from other worlds start to appear where Peter learns what it means to be Spider-Man.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
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

//Create
app.post('/users', (req,res) =>{
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(200).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})
//Update
app.put('/users/:id', (req,res) =>{
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);
    
    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user)
    } else {
        res.status(400).send('no such user');
    }
})
//Create
app.post('/users/:id/:movieTitle', (req,res) =>{
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user');
    }
})
//Delete
app.delete('/users/:id/:movieTitle', (req,res) =>{
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);
    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user');
    }
})
//Delete
app.delete('/users/:id', (req,res) =>{
    const { id } = req.params;

    let user = users.find( user => user.id == id);
    if (user) {
        user = users.find( user => user.id != id);
        res.status(200).send(`user ${id}'s has been deleted`);
    } else {
        res.status(400).send('no such user');
    }
})
//Read
app.get('/movies', (req,res) => {
    res.status(200).json(movies);
})
//Read
app.get('/movies/:title', (req,res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})
//Read
app.get('/movies/genre/:genreName', (req,res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})
//Read
app.get('/movies/director/:directorName', (req,res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})
//Error code that detects errors above
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for Requests
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080')
});
