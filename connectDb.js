const mongoose = require("mongoose")

function connectToDb(Mongo_Url)
{
    return mongoose.connect(Mongo_Url)
}


module.exports = connectToDb;