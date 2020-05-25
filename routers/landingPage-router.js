const router = require("express").Router();
const axios = require("axios");

router.post("/landingpage", (req, res) => {
    const {id} = req.body

    axios
      .get(`https://${process.env.DB_MOVIELIST_URL}/${id}`)
      .then((movies) => {
        res
        .status(200)
        .json(movies.data);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ 
              Error: err, 
              ErrorMessage: "Unable to get Landing Page movie list" 
            });
      });
  });
  
  module.exports = router;
  