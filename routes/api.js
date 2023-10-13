const express = require("express")
const { Ticket } = require("../Models/MoviesTicket")
const router = express.Router()
const {MongoClient,ObjectId} =require("mongodb")
router.get("/allData", async (req, res) => {

    const Data = await Ticket.find({})
    res.send(Data)
})

// add data
router.post("/booking", async (req, res) => {
    console.log("vaibhav")
    const update = await Ticket.findOneAndUpdate({ _id: new ObjectId(req.body.id) })
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

router.get("/lastBookingDetails", async (req, res) => {

    const Data = await Ticket.findOne()
    console.log(Data)
    let lastBookingData = {}
    if (Data.selectedMovie[1]) {
        lastBookingData = {
            selectedMovie: Data.selectedMovie[Data.selectedMovie.length - 1],
            timeSlot: Data.timeSlot[Data.timeSlot.length - 1],
            A1: Data.seats.A1[Data.seats.A1.length - 1],
            A2: Data.seats.A2[Data.seats.A2.length - 1],
            A3: Data.seats.A3[Data.seats.A3.length - 1],
            A4: Data.seats.A4[Data.seats.A4.length - 1],
            D1: Data.seats.D1[Data.seats.D1.length - 1],
            D2: Data.seats.D2[Data.seats.D2.length - 1],
        }
        res.send(JSON.stringify(lastBookingData))
    }
    else {
        res.send(JSON.stringify("No Booking Available"))
    }



})

module.exports =router