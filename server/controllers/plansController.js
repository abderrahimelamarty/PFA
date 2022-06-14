const Plan = require("../Models/PlansModel");
const savePlan = async (req, res) => {
  const name = req.body.name;
  const id = req.user._id;
  const plan = new Plan({
    user: id,
    name: name,
    num_reviews: req.body.num_reviews,
    adress: req.body.adress,
    web_url: req.body.web_url,
    write_review: req.body.write_review,
    website: req.body.website,
    image: req.body.image,
    rating: req.body.rating,
  });
  //const planExists = await Plan.findOne({}, { user: id, name: name });

  //if (planExists) {
  //res.status(201).json({ message: "Plan already exists" });
  //} else {
  plan.save((error, plan) => {
    if (error) return res.status(400).json({ error });
    if (plan) {
      return res.status(201).json({ plan });
    }
  });
  //}
};
const getPlans = async (req, res) => {
  const id = req.user._id;
  let Plans;
  try {
    Plans = await Plan.find({ user: id });
  } catch (err) {
    console.log(err);
  }

  if (!Plans) {
    return res.status(404).json({ message: "No Plans found" });
  }
  return res.status(200).json({ Plans });
};
const removefromPlans = async (req, res) => {
  const id = req.params.id;
  console.log(req.user);
  const ID = req.user._id;
  try {
    const plan = await Plan.deleteOne({ user: ID, _id: id });
    let Plans;
    try {
      Plans = await Plan.find({ user: ID });
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({ Plans });
  } catch (err) {
    console.log(err);
  }

  //const plan = await Plans.findById(id);
};

module.exports = {
  savePlan,
  getPlans,
  removefromPlans,
};
