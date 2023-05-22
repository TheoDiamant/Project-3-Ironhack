const express = require("express");
const router = express.Router();

const Room = require("../models/Room.model")

//Route to fetch all existing chats from this user
router.post("/all-chats", (req, res, next) => {
    
    const { _id } = req.body

    Room.find({ users: { $in: [_id] } })
    .populate({
        path: "users",
        select: "profilePicture name"
    })
    .then(rooms => {
        if(rooms.length === 0) {
            res.json([])
        }
        else {
            res.json(rooms)
        }
    })
    .catch(err => res.json(err))
})

//Route to fetch the specific room between the two users, or create one if it's their first interaction
router.post("/single-chat", (req, res, next) => {

    const { chatIDs } = req.body

    Room.find({ users: { $all: [chatIDs[0], chatIDs[1]] } })
    .populate({
        path: "users",
        select: "profilePicture",
    })
    .then(room => {
        
        if(room.length === 0) {
            
            Room.create({users: [chatIDs[0], chatIDs[1]]})
            .then(newRoom => {
                return Room.populate(newRoom, {
                    path: "users",
                    select: "profilePicture",
                })
            })
            .then(newRoom => {
                console.log(newRoom)
                res.json([newRoom])
            })
            .catch(err => res.json(err))
        }
        else {
            res.json(room)
        }
    })
    .catch(err => res.json(err))
})

//Route to update a specific room's messageHistory, appending messages
router.post("/append-message", (req, res, next) => {

    const { roomID, messageToStore } = req.body

    Room.findById(roomID)
    .then(room => {
        room.messageHistory.push(messageToStore)
        room.save()
        res.status(200).send("Updated chat history")
    })
    .catch(err => res.json(err))
})

//Route to set offer messages as interacted with
router.post("/interact-offer", (req, res, next) => {
    
    const { roomID } = req.body
    
    Room.findById(roomID)
    .then(room => {
        for(let i = room.messageHistory.length - 1; i >= 0; i--) {
            if (room.messageHistory[i].isOffer) {
                room.messageHistory[i].isOffer = null
                break;
            }
        }
        return room.save()
    })
    .then(() => res.json(200))
    .catch(err => res.json(err))
    

})

//Route to remove checkout button from message history once clicked
router.post("/checked-out", (req, res, next) => {
    
    const { roomID } = req.body
    
    Room.findById(roomID)
    .then(room => {
        for(let i = room.messageHistory.length - 1; i >= 0; i--) {
            if (room.messageHistory[i].hasCheckoutButton) {
                room.messageHistory[i].isOffer = false
                break;
            }
        }
        return room.save()
    })
    .then(() => res.json(200))
    .catch(err => res.json(err))
})

module.exports = router

