const { Schema, model } = require("mongoose")

const roomSchema = new Schema(
    {
        users: [
            {type: Schema.Types.ObjectId, ref: "User"}
        ],
        messageHistory: [
           {
            content: {type: String},             
            sender: {type: Schema.Types.ObjectId, ref: "User"},       
            timestamp: {type: Date, default: Date.now}
           }
        ]
    } 
)

const Room = model("Room", roomSchema)

module.exports = Room