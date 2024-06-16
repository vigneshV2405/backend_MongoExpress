const User = require('./model.js');

const getFriends = async (req,res)=>{
    try{
        let friends = await User.find({id:req.params.id})
        res.send(friends)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getFriends
}