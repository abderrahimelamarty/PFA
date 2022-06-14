const mongoose = require("mongoose");
const planSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  num_reviews: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  write_review: {
    type: String,
    required: true,
  },

  adress: {
    type: String,
    required: true,
  },
  web_url: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("plan", planSchema);
