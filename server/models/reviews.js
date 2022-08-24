const mongoose = require('mongoose')

const ReviewsSchema = mongoose.Schema({
    movieID : {
        type: Number,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    review : {
        type: String,
        required: true
    },
    likes : {
        type: Array,
        required: false,
    }
})

const ReviewsModel = new mongoose.model("reviews", ReviewsSchema)

module.exports = ReviewsModel