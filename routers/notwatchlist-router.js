const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post('/:id/notwatchlist', (req, res) => {
    const {id} = req.params;
    const notwatchlist = { user_id: id, movie_id: req.body.movie_id }
    axios
        .post(
            process.env.NOTWATCHLIST_URL,
            notwatchlist,
        )
        .then((response) => {
            if (response.status === 200) {
                res.status(200).json(response.data.data)
            }
        }
        )
        .catch((error) => {
            res.status(500).json({
                errorMessage: 'Could not remove from explore page.'
            })
        })
})
module.exports = router;