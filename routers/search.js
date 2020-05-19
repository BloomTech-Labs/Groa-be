const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:user_id/search", (req, res) => {
  const query = {
    query: req.body.search,
  };
  // Due to Cors errors in the front end required to call DS API in backend
  axios
    .post("https://ds.groa.us/search", query)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        res.status(200).json(response.data.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
