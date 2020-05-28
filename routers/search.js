const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/:user_id/search", (req, res) => {
  // Due to Cors errors in the front end required to call DS API in backend
  axios
    .post("https://ds.groa.us/search", req.body)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
