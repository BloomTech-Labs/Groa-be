const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/:id/service-providers/:movie_id', (req, res) => {
    const {id, movie_id} = req.params;
    // console.log('rec', req.params)
    axios
        .get(`https://ds.groa.us/service-providers/${movie_id}`)
        .then((response) => {
            console.log('this is response', response.data.data)
            if (response.status === 200) {
                res.status(200).json(response.data.data)
            }
        })
        .catch((error) => {
            res.status(500).json({
                errorMessage: 'could not get service providers.'
            })
        })
})
module.exports = router;