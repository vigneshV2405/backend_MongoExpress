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
    if(req.params._id.length===24){
        hotel.find({_id:req.params._id}).then((resp)=>{
            res.json({hotel:resp[0]})
        }).catch((err)=>{
            console.log(err)
        })
    }
    else{
        res.send('invalid url')
    }
})
app.get('/gethotelnames',async (req,res)=>{
    let hotelnames = await hotel.find({},{hotelname:1})
    res.json({hotelnames})
})
app.put('/edithotel/:id',async (req,res)=>{
    let resp = await hotel.updateOne({_id:req.params.id},{
        $set:{
            hotelname:req.body.hotelname,
            image:req.body.image,
            contact:req.body.contact,
            location:req.body.location
        }
    })
    if(resp.modifiedCount===1){
        res.json({edited:true})
    }
    if(resp.modifiedCount===0){
        res.json({edited:'same details'})
    }
})
app.delete('/deletehotel', async (req,res)=>{
    let {deletedCount} = await hotel.deleteOne({_id:req.body.selectedHotel})
    if(deletedCount===1){
        res.json({deleted:true})
    }
    else{
        res.json({error:'unable to delete'})
    }
})

app.listen(process.env.PORT,()=>{console.log(`server running on ${process.env.PORT}`)})