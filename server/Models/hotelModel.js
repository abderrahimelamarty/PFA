const mongoose = require("mongoose");
const hotelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  ranking: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Hotel", hotelSchema);
