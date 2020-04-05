const router = require("express").Router();

const {
    getAllMovies
} = require("./movies-model");

router.get("/:user_id/get-movies", (req, res) => {
    getAllMovies(req.params.user_id)
    .then(movies => {
        res.status(200).json(movies)
    })
    .catch(err => 
        res.status(500).json({
            message: "Something went wrong getting movies.",
            error: err,
            errorMessage: err.message
    }))
})
module.exports = router;