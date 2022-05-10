const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BandSchema = new Schema({
    name : String,
    genre : String,
    image : String,
    favourite_album : String,
    favourite_song : String
});


module.exports = mongoose.model('band', BandSchema);