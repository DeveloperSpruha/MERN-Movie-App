const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// Users Model
const UserModel = require('./models/users')
// Watchlist Model
const WatchlistModel = require('./models/watchlist')
// Review Model
const ReviewsModel = require('./models/reviews')
const { request, response } = require('express')

app.use(express.json());
app.use(cors());

const PORT = 3001;

mongoose.connect("mongodb+srv://DeveloperSpruha:Sixstring123@movieprojectcluster.vhphiwl.mongodb.net/MovieDB?retryWrites=true&w=majority")

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is working just fine.")
})

// GET REQUESTS
// Get All Users API
app.get('/getUsers/', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Login API
app.post('/loginAPI', (req, res) => {
    const user = req.body
    const username = req.body.username
    const password = req.body.password
    UserModel.find({username: username, password:password}, async (err, result) => {
        if (err){
            res.json(err)
        } else {
            const users = result
            if (users.length < 1) {
                res.json("Incorrect credentials. Please try again.")
            } else {
                res.json('Successfully signed in.')
            }
        }
    });
})

// Get Movie Reviews API
app.get('/getReviews/:movieid', (req, res) => {
    const movieID = req.params.movieid
    ReviewsModel.find({movieID: movieID}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });
});

// Get Watchlists API
app.get('/getWatchlist/:username', (req, res) => {
    const username = req.params.username
    WatchlistModel.find({username: username}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            let movies = result[0]['movies']
            res.json(movies)
        }
    });
});

// POST REQUESTS
// Create User API
app.post("/createUser/", async (req, res) => {
    const user = req.body
    const username = req.body.username
    const watchlistObject = {username: username, movies: []}
    UserModel.find({username: username}, async (err, result) => {
        if (err){
            res.json(err)
        } else {
            const users = result
            if (users.length < 1) {
                const newUser = new UserModel(user);
                const newWatchlist = new WatchlistModel(watchlistObject);
                await newUser.save();
                await newWatchlist.save()
                res.json("Success")
            } else {
                res.json('Failure')
            }
        }
    });
});

// UPDATE REQUESTS
// Update Watchlist
app.post("/addMovie/:username/", async (req, res) => {
    const user = req.params.username
    const movieDetails = req.body
    const movieDetailID = req.body['id']
    var document = await WatchlistModel.find({username: user})
    let movies = document[0]['movies']
    if (movies.some(movie => movie.id === movieDetailID)){
        res.json('Already exists in your watchlist.')
    } else {
        movies.push(movieDetails)
        document[0].save()
        res.json('Added to watchlist!')
    }
})

// Delete from watchlist
app.post("/deleteMovie/:username/", async (req, res) => {
    const user = req.params.username
    const movieDetails = req.body
    const movieDetailID = req.body['id']
    var document = await WatchlistModel.find({username: user})
    let movies = document[0]['movies']
    movies = movies.filter(movie => movie.id !== movieDetailID)
    document[0]['movies'] = movies
    document[0].save()
    res.json()
})

// Add Review
app.post("/sendReview/", async (req, res) => {
    const review = req.body
    const newReview = new ReviewsModel(review)
    await newReview.save()
    res.json()
})

// Add Like to Review
app.post("/like/:username", async (req, res) => {
    const user = req.params.username
    const review = req.body
    const document = await ReviewsModel.find(review)
    if (!review['likes'].includes(user)){
        document[0]['likes'].push(user)
        document[0].save()
        res.json("LIKED")
    } else {
        res.json(document[0])
    }
})

//Remove Like from Review
app.post("/unlike/:username", async (req, res) => {
    const user = req.params.username
    const review = req.body
    const document = await ReviewsModel.find(review)
    if (review['likes'].includes(user)){
        const newLikes = review['likes'].filter(like => like != user)
        document[0]['likes'] = newLikes
        document[0].save()
    }
    res.json("Unliked")
})