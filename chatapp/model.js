const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL).then((res)=>{

})

const userSchema = new mongoose.Schema({
    name : String,
    id : String,
    email : String,
    friends : Array
})

module.exports = mongoose.model('user',userSchema)