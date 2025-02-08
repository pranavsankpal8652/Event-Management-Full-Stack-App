const { attendeesModel } = require("../model/AttendeesModel")
const { eventModel } = require("../model/EventModel")

const getEvents = async(req, res) => {
    try{
        const events=await eventModel.find()
        let obj={
            status:1,
            events
        }
        // console.log(obj)
        res.send(obj)
    }
    catch(err){
        console.log(err)
         res.status(400).json({message:'Error While Loading Events!'})

    }

}
let registerForEvent=async(req,res)=>{
    const { eventId } = req.body
    // console.log(req.body)
    let insUserRegObj ={
       userId:req.user.id,
       eventId
    }
    try {
            const insuserForReg = new attendeesModel(insUserRegObj)
            const insEventReg_res = await insuserForReg.save()
            let obj = {
                status: 1,
                message: 'Registered For Event!',
                insEventReg_res
            }
        
      
        res.send(obj)

    }
    catch (err) {
      console.log(err)
      res.status(404).json({message:'Something went wrong!Try Again Later'})

    }
}

module.exports = { getEvents,registerForEvent}