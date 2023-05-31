const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
//import built in node modules fs and path
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const app = express();
// create a write stream(in append mode) 
//log text file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true});

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
app.get('/', (req,res) => {
    res.send('Welcome to my movie club!');
});

app.get('/documentation', (req,res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

//Read
app.get('/movies', (req,res) => {
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
app.get('/movies/:Title', (req,res) => {
    Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
        res.json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ', err);
    });
});

// GET JSON genre info when looking for specific genre
app.get('/movies/genres/:Genre', (req,res) => {
    Movies.findOne({ 'Genre.Name': req.params.Genre })
    .then((genre) => {
        res.json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ', err);
    });
});

// GET JSON genre info when looking for specific Director
app.get('/movies/directors/:Director', (req,res) => {
    Movies.findOne({ 'Director.Name': req.params.Director })
    .then((director) => {
        res.json(director);
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
            res.status(500).send('Error' + err);
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
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                    })
                    .then ((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error' + error);
        });
});

//Add a favorites to a users list
app.post('/users/movies/:MovieID', (req,res) => {
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
app.put('/users/:Username', (req, res) => {
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
app.delete('/users/:Username', (req,res) =>{
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
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080')
});