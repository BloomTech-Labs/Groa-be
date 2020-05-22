const router = require("express").Router();
const axios = require("axios");

router.get("/landingpage", (req, res) => {
    axios
      .get("https://ds.groa.us/movie-list/35")
      .then((movies) => {
        res.status(200).json(movies.data);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ Error: err, ErrorMessage: "Unable to get Landing Page movies" });
      });
  });
  module.exports = router;
  