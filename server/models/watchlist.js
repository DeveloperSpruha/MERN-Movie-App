const mongoose = require('mongoose')

const WatchlistSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    movies : {
        type: Array,
        required: false,
    }
})

const WatchlistModel = new mongoose.model("watchlists", WatchlistSchema)

module.exports = WatchlistModel