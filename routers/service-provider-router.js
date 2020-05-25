const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/:id/service-providers/:movie_id', (req, res) => {
    const { id, movie_id } = req.params;
    const serviceProviders = { user_id: id, movie_id: movie_id }
    axios
        .get(`https://ds.groa.us/service-providers/${movie_id}`,
        )
        .then((response) => {
            if (response.status === 200) {
                const uniqueLinks = new Set();
                const result = [];
                response.data.data.forEach((provider) => {
                    if (!uniqueLinks.has(provider.link)) {
                        uniqueLinks.add(provider.link);
                        result.push(provider);
                    }
                })
                console.log('this is unique result', result);
                res.status(200).json(result);
            }
        })
        .catch((error) => {
            res.status(500).json({
                errorMessage: 'could not get service providers.'
            })
        })
})
module.exports = router;