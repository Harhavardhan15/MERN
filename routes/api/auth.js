const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route  GET api/auth
// @desc   Test Route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) { 
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/user
// @desc   Register User
// @access Public
router.post(
    "/",
    [
          check("email", "Please include valid email id").isEmail(),
      check("password", "Password is required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { email, password } = req.body;
  
        // See if user exists
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
      

        // Return Jsonwebtoken
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res
    .status(400)
    .json({ errors: [{ msg: "Invalid Credentials" }] });
  }
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
         config.get("jwtSecret"),
          { expiresIn: "5 days" },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
            console.log(token);
          }
        );
        //res.send("User Registered");
      } catch (err) {
        console.error(err).message;
        res.status(500).send("Server err");
      }
    }
  );
  
module.exports = router;
