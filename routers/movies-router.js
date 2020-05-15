const router = require("express").Router();
const axios = require("axios");

const { getAllMovies } = require("../models/movies-model.js");

router.get("/:user_id/get-movies", (req, res) => {
  axios
    .get("https://ds.groa.us/explore")
    .then((movies) => {
      if (movies.status === 200) res.status(200).json(movies.data.data);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ Error: err, ErrorMessage: "Unable to get movies" });
    });
});
module.exports = router;
