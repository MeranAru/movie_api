const express = require('express');
const morgan = require('morgan');
//import built in node modules fs and path
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
const bodyParser = require('body-parser');
const app = express();
const uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Director= Models.Director;

const cors = require('cors');
app.use(cors());


//send all files automatically to the public folder
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//mongoose.connect( "mongodb+srv://meranarumugam:12345@movieapi.0isxclf.mongodb.net/myFlixDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true});

//setup the logger

//app.use(logger);

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
            Name: 'Jon Watts',
            Born: 'June 28, 1981',
            Bio: 'Jon Watts is an American filmmaker and screenwriter.'
        },
    },
    {
        Title: 'The Boy Next Door',
        Description: 'A woman, separated from her unfaithful husband, falls for a younger man who has moved in next door, but their torrid affair soon takes a dangerous turn.',
        Genre: {
            Name: 'Thriller',
            Description: 'In the movie industry, thriller movies is when a movie has an exciting plot, typically involving crime or espionage.',
            },
        Director: {
            Name: 'Rob Cohen',
            Born: 'March 12, 1949',
            Bio: 'Rob Cohen is an American film director, producer and screenwriter.'
        },
    },
    {
        Title: 'The Dark Knight',
        Description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
            Name: 'Christopher Nolan',
            Born: 'July 30, 1970',
            Bio: 'Christopher Nolan is a cerebral, often nonlinear, storytelling, acclaimed writer-director.'
        },
    },
    {
        Title: 'Fight Club',
        Description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
        Genre: {
            Name: 'Drama',
            Description: 'In the movie industry, drama movies is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
            },
        Director: {
            Name: 'David Fincher',
            Born: 'August 28, 1962',
            Bio: 'David Fincher is a film director.'
        },
    },
    {
        Title: 'Inception',
        Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
            Name: 'Christopher Nolan',
            Born: 'July 30, 1970',
            Bio: 'Christopher Nolan is a cerebral, often nonlinear, storytelling, acclaimed writer-director.'
        },
    },
    {
        Title: 'Wall-e',
        Description: 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
        Genre: {
            Name: 'Animation',
            Description: 'In the movie industry, animation movies is the process of making films in which drawings or puppets appear to move.',
            },
        Director: {
            Name: 'Andrew Stanton',
            Born: 'December 3, 1965',
            Bio: 'Andrew Stanton has been a major creative force at Pixar Animation Studios since 1990, when he became the second animator and ninth employee to join the company elite group of computer animation pioneers.'
        },
    },
    {
        Title: 'Joker',
        Description: 'The rise of Arthur Fleck, from aspiring stand-up comedian and pariah to Gotham clown prince and leader of the revolution.',
        Genre: {
            Name: 'Thriller',
            Description: 'In the movie industry, thriller movies is when a movie has an exciting plot, typically involving crime or espionage.',
            },
        Director: {
            Name: 'Todd Phillips',
            Born: 'December 20, 1970',
            Bio: 'Todd Phillips is an American film director, producer, and screenwriter.'
        },
    },
    {
        Title: 'Guardians of the Galaxy Vol. 3',
        Description: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
        Genre: {
            Name: 'Action',
            Description: 'In the movie industry, action movies is when a protaganist is sent into numerous events which have violence.',
            },
        Director: {
            Name: 'James Gunn',
            Born: 'August 5, 1966',
            Bio: 'James Gunn wrote and acted in the film The Specials (2000) with Rob Lowe, Jamie Kennedy, Thomas J. Churchill and his brother Sean Gunn.'
        },
    }
];

//Get requests
app.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    res.send('Welcome to my movie club!');
});

app.get('/documentation', (req,res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

//Read
app.get('/movies', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) =>{
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//Read
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ', err);
    });
});

// GET JSON genre info when looking for specific genre
app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.find({ 'Genre.Name': req.params.genreName })
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ', err);
    });
});

// GET JSON genre info when looking for specific Director
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req,res) => {
    Movies.find({ 'Director.Name': req.params.directorName })
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ', err);
    });
});

//Read
app.get('/users', (req,res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/users/:Username', (req,res) => {
    Users.findOne({ Username: req.params.Username})
    .then((user) => {
        if (user) {
            return res.status(404).send('Error: ' + req.params.Username + ' was not found');
        } else {
            res.json(user);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Create
app.post('/users', (req,res) => {
    // Validation logic here for request
    //you can either use a chain of methods like .not().isEmpty()
     //which means "opposite of isEmpty" in plain english "is not empty"
     //or use .isLength({min: 5}) which means
     //minimum value of 5 characters are only allowed
    [ check('Username', 'Username is requred').isLength({ min: 5 }),
    check('Username', 'Username contains non-alphanumeric characters - not allowed').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail
], (req,res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
}
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
        .then((user) => {
            if (user) { //If the user is found, send a response that it already exists
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then ((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Add a favorites to a users list
app.post('/users/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req,res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    //Make sure that the updated document is returned
    {new:true},
    (err, updatedUser) => {
        if (err){
            console.log(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    })
})

// Update a user's info, by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username }, 
        {
            $set: {
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
            },
        },
    { new: true }, 
    // This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
        } else {
        res.json(updatedUser);
        }
    });
});

//Delete
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req,res) =>{
    Users.findOneAndRemove(
        { Username: req.params.Username })
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + 'was not found');
            } else {
                res.status(200).send(req.params.Username + 'was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Error code that detects errors above
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for Requests
const port = process.env.PORT|| 8080;
app.listen(port, '0.0.0.0', () =>{
    console.log('Listening on port' + port)
});