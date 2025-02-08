const { Server, Socket } = require("socket.io");
const { attendeesModel } = require("../model/AttendeesModel");

let webSocket = (server) => {
    const io = new Server(server,{
        cors: {
            origin: "https://event-management-full-stack-app.vercel.app/", // Or replace with "http://localhost:3000"
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization"],
            credentials: true,
          },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinEvent", async(eventId) => {
            // console.log(eventId)
            try{
                const attendeeCount = await attendeesModel.countDocuments({ eventId });
                // console.log("attendeeCount"+attendeeCount)
    
                socket.emit("updateAttendees", { eventId, count:attendeeCount });
            }
            catch(err){
                console.log("error fetching count",err)
            }
          
        });


        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });


}

module.exports = { webSocket }