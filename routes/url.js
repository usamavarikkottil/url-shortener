const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// @route POST /api/url/shorten
// @desc Create short URL
router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    console.log(longUrl) ;


    const baseUrl = config.get("baseURI");

    if(!validUrl.isUri(baseUrl)) {
        res.status(403).json("Invalid base URL");

    }

    // Create url code
    const urlCode = shortId.generate();

    // Check long URL
    if(validUrl.isUri(longUrl)) {

        try {
            let url = await Url.findOne({longUrl});
            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);

            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Server Error...")
        }
    } else {

        res.status(403).json("Invalid long Url")
    }


})


module.exports = router;