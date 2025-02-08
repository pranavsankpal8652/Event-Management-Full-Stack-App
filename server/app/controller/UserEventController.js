const { userModel } = require("../model/UsersModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { eventModel } = require("../model/EventModel");
const { attendeesModel } = require("../model/AttendeesModel");
require('dotenv').config();
const createEvent = async (req, res) => {
    const { name, description, date,category,_id } = req.body
    console.log(req.body)
    let insEventObj ={
        "eventName": name,
        "eventDesc": description,
        "date": date,
        "category":category,
        "owner":req.user.id
    }
    try {
        if(_id){
            const updateEventObj_res = await eventModel.updateOne({_id:_id},{$set:insEventObj})
            var obj = {
                status: 1,
                message: 'Event Updated',
                updateEventObj_res
            }

        }else{
            const insEvent = new eventModel(insEventObj)
            const insEventObj_res = await insEvent.save()
            var obj = {
                status: 1,
                message: 'Event Created',
                insEventObj_res
            }
        }
      
        res.send(obj)

    }
    catch (err) {
      console.log(err)
      res.status(404).json({message:'Something went wrong!'})

    }
}


const readEvents = async(req, res) => {
    const {id} =req.user
    const {editId}=req.params
   
    try{
        if(editId){
         const event=await eventModel.findOne({_id:editId})
         console.log(event)
         var obj={
            status:1,
            event
        }
        }
        else{
            const events=await eventModel.find({owner:id}).lean()
            var obj={
                status:1,
                events
            }
        }
       
        // console.log(obj)
        res.send(obj)
    }
    catch(err){
        console.log(err)
         res.status(400).json({message:'Error While Loading Events!'})

    }

}

const deleteEvents=async(req,res)=>{
    const {id}=req.params
    try{
        const delete_response=await eventModel.deleteOne({_id:id})
        const delete_attendees_data=await attendeesModel.deleteMany({eventId:id})
       let obj={
        status:1,
        message:"Event deleted!",
        delete_response
       }
       res.send(obj)
    }
    catch(err){
        console.log(err)
        res.status(400).json({messaege:'Error Deleting Event'})
    }
}





module.exports = { createEvent, readEvents,deleteEvents}