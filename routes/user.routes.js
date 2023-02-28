const express = require("express");
// const { signUp } = require("../controllers/user.controller");
const router = express.Router();
const { User, validate } = require('../models/user.model')

router.post("/sign", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      res.json({ Error: error.message });
    } else {
      const user = await new User(req.body).save();

      res.send(user);
    }
  } catch (error) {
    res.json({ message: "An error occurred..." });
    console.log(error);
  }
});

module.exports = router;
