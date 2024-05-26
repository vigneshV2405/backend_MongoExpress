const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
var hotel = require('./hotelModel')
const cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.get('/getallhotels',(req,res)=>{
    hotel.find().then((resp)=>{
        setTimeout(()=>{
            res.json({data:resp})
        },1000)
    })
})
app.post('/addhotel',(req,res)=>{
    let newHotel = new hotel(req.body)
    newHotel.save().then((resp)=>{
        console.log('resp::',resp)
        res.json({added:true})
    }).catch((err)=>{
        console.log('err::',err)
    })
})
app.get('/gethotel/:_id',async (req,res)=>{
    let search = await hotel.find({_id:req.params._id})
    res.json({hotel:search[0]})
})

app.listen(process.env.PORT,()=>{console.log(`server running on ${process.env.PORT}`)})