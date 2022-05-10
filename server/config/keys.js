const dotenv = require("dotenv")
dotenv.config()



module.exports = {
    Bands: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6e1g9.mongodb.net/bands?retryWrites=true&w=majority`
}