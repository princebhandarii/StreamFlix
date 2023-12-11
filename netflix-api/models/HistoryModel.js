const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    user_id  : {
      type: String,
      required: true,
    },
    movie_id: {
      type    : Number ,
      required : true
    },
  });
  
  module.exports = mongoose.model("history", historySchema);