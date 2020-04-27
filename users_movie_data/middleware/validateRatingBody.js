module.exports = function (req, res, next) {
  switch (true) {
    case !req.body:
      res
        .status(400)
        .json({ message: "Please send a body with this request." });
      break;
    case !req.body.movie_id || !req.body.rating:
      res.status(400).json({
        message: "Please send a movie id with this request.",
      });
    case !req.body.rating:
      res.status(400).json({
        message: "Please send a movie rating with this request.",
      });
    default:
      return next();
  }
};
