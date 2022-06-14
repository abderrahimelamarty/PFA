const Hotel = require("../Models/hotelModel");
const getHotels = async (req, res) => {
  let Hotels;
  try {
    Hotels = await Hotel.find();
  } catch (err) {
    console.log(err);
  }

  if (!Hotels) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ Hotels });
};
const addHotels = async (req, res) => {
  const { title, rating, ranking, price, image } = req.body;
  let hotel;
  try {
    hotel = new Hotel({
      title,
      rating,
      ranking,
      price,
      image,
    });
    await hotel.save();
  } catch (err) {
    console.log(err);
  }
  if (!hotel) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ hotel });
};

module.exports = {
  getHotels,
  addHotels,
};
