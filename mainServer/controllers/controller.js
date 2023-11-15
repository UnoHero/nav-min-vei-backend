const user = require("../models/model")
const mongoose = require("mongoose")

// get a single User
const getUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findById(id)
  
    if (!user) {
      return res.status(404).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }

  module.exports = {
    getUser
  }