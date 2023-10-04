const express=require("express")
const mongoose=require("mongoose")
const {Ticket}=require("./Models/MoviesTicket")
const cors = require('cors')
const {MongoClient,ObjectId} =require("mongodb")
const bodyParser=require('body-parser')



const app=express()
app.use(bodyParser.json())
app.use(cors())


// database connection
mongoose.connect("mongodb://0.0.0.0:27017/bookMyShow")
.then(()=>
{
    console.log("database Connected")
})
.catch(error=>console.log("error",error))

// server running
app.listen(8080,()=>
{
    console.log('Server Running')
})

// first time  execute if no document available
const creteDocument=async()=>{

    const Data= await Ticket.find({})
    const SaveData=await Ticket()
        if(Data==0)
        {
            SaveData.selectedMovie.push("Demo")
            SaveData.timeSlot.push("0:0")
            SaveData.seats.A1.push(0)
            SaveData.seats.A2.push(0)
            SaveData.seats.A3.push(0)
            SaveData.seats.A4.push(0)
            SaveData.seats.D1.push(0)
            SaveData.seats.D2.push(0)
            SaveData.save()
        }
    console.log(Data)


}
creteDocument()

// api
app.get("/allData",async(req,res)=>
{
    const Data= await Ticket.find({})
    res.send(Data)
})

// add data
app.post("/booking",async(req,res)=>
{
   const update= await Ticket.findOneAndUpdate({_id:new ObjectId(req.body.id)})
   update.selectedMovie.push(req.body.selectedMovie)
   update.timeSlot.push(req.body.timeSlot)
   update.seats.A1.push(req.body.A1)
   update.seats.A2.push(req.body.A2)
   update.seats.A3.push(req.body.A3)
   update.seats.A4.push(req.body.A4)
   update.seats.D1.push(req.body.D1)
   update.seats.D2.push(req.body.D2)
   update.save()
   res.send("success")

})

app.get("/lastBookingDetails",async(req,res)=>
{

const Data= await Ticket.findOne()
console.log(Data)
let lastBookingData={}
if(Data.selectedMovie[1])
{
     lastBookingData={
        selectedMovie:Data.selectedMovie[Data.selectedMovie.length-1],
        timeSlot:Data.timeSlot[Data.timeSlot.length-1],
        A1:Data.seats.A1[Data.seats.A1.length-1],
        A2:Data.seats.A2[Data.seats.A2.length-1],
        A3:Data.seats.A3[Data.seats.A3.length-1],
        A4:Data.seats.A4[Data.seats.A4.length-1],
        D1:Data.seats.D1[Data.seats.D1.length-1],
        D2:Data.seats.D2[Data.seats.D2.length-1],
    }
    res.send(JSON.stringify(lastBookingData))
}
else
{
    res.send(JSON.stringify("No Booking Available"))
}



})