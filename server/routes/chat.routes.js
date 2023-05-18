const express = require("express");
const router = express.Router();

const Room = require("../models/Room.model")

//Route to fetch all existing chats from this user
router.post("/all-chats", (req, res, next) => {

    const { _id } = req.body

    Room.find({ users: { $in: [_id] } })
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
    .then(room => {
        if(room.length === 0) {
            Room.create({users: [chatIDs[0], chatIDs[1]]})
            .then(newRoom => {
                res.json(newRoom)
            })
        }
        else {
            res.json(room)
        }
    })
    .catch(err => res.json(err))
})

module.exports = router
