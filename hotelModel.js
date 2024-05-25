const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL).then((res)=>{

})

const hotelSchema = new mongoose.Schema({
    hotelname : String,
    image : String,
    contact : Number,
    location : String
})

module.exports = mongoose.model('hotel',hotelSchema)