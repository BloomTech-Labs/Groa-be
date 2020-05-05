const router = require("express").Router();

// model functions
const {
  addToWatchList,
  getWatchlist,
  removeMovieFromWatchList,
} = require("../models/watch_list.js");

router.post("/:user_id/add-to-watchlist", (req, res) => {
  const movie = {
    date: new Date(),
    movie_id: req.body.movie_id,
    user_id: Number(req.params.user_id),
  };
  addToWatchList(movie)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) =>
      res.status(500).json({
        message:
          "Sorry. Something went wrong while trying to add this movie to your watch list.",
        error: err,
        error_message: err.message,
      })
    );
});

router.get("/:user_id/get-watchlist", (req, res) => {
  getWatchlist(req.params.user_id)
    .then((watchlist) => res.status(200).json(watchlist))
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong in gettings ratings.",
        error: err,
        errorMessage: err.message,
      })
    );
});

router.delete("/:user_id/remove-from-watchlist/:watchlist_id", (req, res) => {
  removeMovieFromWatchList(req.params.watchlist_id)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(500).json({
        message:
          "Something went wrong in removing that movie from your watchlist.",
        error: err,
        errorMessage: err.message,
      })
    );
});

module.exports = router;
