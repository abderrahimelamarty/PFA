const mongoose = require('mongoose')

const connectDB = async () => {
 
  try {
    const conn = await mongoose.connect("mongodb+srv://Abderrahim:aseds12345@clusternodejs.oa5us.mongodb.net/test")

    console.log("MongoDB Connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB