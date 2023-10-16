require('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")
const {Ticket}=require("./Models/MoviesTicket")
const cors = require('cors')
const PORT=process.env.PORT || 8080
const DB_NAME=process.env.DB_NAME
const bodyParser=require('body-parser')
const api=require("./routes/api.js")



const app=express()
app.use(bodyParser.json())
app.use(cors())
app.use("/api",api)

// database connection
mongoose.connect(DB_NAME)
.then(()=>
{
    console.log("database Connected")
})
.catch(error=>console.log("error",error))

// server running
app.listen(PORT,()=>
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
