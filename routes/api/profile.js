const express = require("express");
const router = express.Router();


// @route  GET api/profile
// @desc   Test Route
// @access Public
router.get("/", (req,res) => {
res.send("Auth Profile");
})

module.exports = router;