const { attendeesModel } = require("../model/AttendeesModel");

let checkRegistered = async(req, res, next) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id; // Get userId from token

        // Check if user already registered
        const existingAttendee = await attendeesModel.findOne({ eventId, userId });
        if (existingAttendee) {
            return res.status(400).json({ message: "You are already registered for this event." });
        }
        next()

    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ message: "Somwthing Went Wrong" });

    }
}

module.exports={checkRegistered}