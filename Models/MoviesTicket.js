const mongoose =require("mongoose")
const {Schema,model} =mongoose

const movieTicketSchema=new Schema({
    selectedMovie:[],
        timeSlot:[],
       seats:{ 
        A1:[],
        A2:[],
        A3:[],
        A4:[],
        D1:[],
        D2:[],}
    
     
})


const Ticket=model("Ticket",movieTicketSchema)
module.exports={Ticket}