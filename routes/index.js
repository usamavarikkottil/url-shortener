const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// @route   GET /:code
// Desc     Redirect to long/original URL
router.get("/:code", async (req, res) => {

    try {
        const url = await Url.findOne({urlCode: req.params.code});
        // console.log(url);
        if(url) {
            // console.log(url.longUrl)
            res.redirect(url.longUrl);
        } else {
            res.status(404).json("URL not found, please create one")
        }
    } catch(error) {
        console.log(error);
        res.status(500).json("Server Error...");

    }
})

module.exports = router;