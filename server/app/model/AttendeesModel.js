const mongoose = require('mongoose')

const attendeesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "events", required: true },
    registeredAt: { type: Date, default: Date.now }

}, {
    timestamps: true
})
const attendeesModel = mongoose.model("attendee", attendeesSchema)
module.exports = { attendeesModel }