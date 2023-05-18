const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const User = require("../models/User.model")
const Room = require("../models/Room.model")

module.exports = router
