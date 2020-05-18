const router = require("express").Router();
const axios = require("axios");

// model functions
const { addRating, getRatings } = require("../models/ratings.js");

// middleware
const validateRatingBody = require("../database/middleware/validateRatingBody.js");

/**
 * @api {post} /users/:user_id/add-movie-rating
 * @apiName Rate a Movie
 * @apiGroup Ratings
 *
 * @apiParam {string} name **Required** | Title of the movie you want to rate.
 * @apiParam {integer} year **Required** | The year the movie was made.
 * @apiParam {float} rating **Required** | The rating, can be 0 - 5 and accepts 3.5
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "id": 4006,
 *    "date": "2020-03-17T05:00:00.000Z",
 *    "name": "Young Frankenstein",
 *    "year": 1974,
 *    "rating": 4,
 *    "user_id": 48485
 *  }
 *
 * @apiError MissingBodyReqs The <code>req.body.param</code> was not found.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    message: "Please send a movie name with this request."
 *  }
 *
 */
router.post("/:user_id/add-movie-rating", validateRatingBody, (req, res) => {
  const newRating = {
    movie_id: req.body.movie_id,
    rating: req.body.rating * 1,
    user_id: req.params.user_id,
  };
  axios
    .post("https://ds.groa.us/rating", newRating)
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data.data);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage:
          "Could not retrieve any recommendations for your account.",
      });
    });
});

/**
 * @api {get} /users/:user_id/get-ratings
 * @apiName Get Movie Ratings
 * @apiGroup Ratings
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 * [
 *   {
 *     "id": 3999,
 *     "date": "2020-03-17T05:00:00.000Z",
 *     "name": "Lilo & Stitch",
 *     "year": 2002,
 *     "rating": 5,
 *     "poster_url": "/tVaEulzowKhMhDvHNNYb9rNEZPB.jpg"
 *   },
 *   {
 *     "id": 6117,
 *     "date": "2020-03-24T05:00:00.000Z",
 *     "name": "Some Like It Hot",
 *     "year": 1959,
 *     "rating": 3,
 *     "poster_url": "/pxc9EFCMYkItESpqqrI783yl8Gh.jpg"
 *   },
 *   {
 *     "id": 3998,
 *     "date": "2020-03-17T05:00:00.000Z",
 *     "name": "Ice Age",
 *     "year": 2002,
 *     "rating": 3.5,
 *     "poster_url": "/zpaQwR0YViPd83bx1e559QyZ35i.jpg"
 *   }
 * ]
 *
 * @apiError MissingBodyReqs The <code>req.body.param</code> was not found.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    message: "Please send a movie name with this request."
 *  }
 *
 */
router.get("/:user_id/get-ratings", (req, res) => {
  getRatings(req.params.user_id)
    .then((ratings) => {
      res.status(200).json(ratings);
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong in gettings ratings.",
        error: err,
        errorMessage: err.message,
      })
    );
});

module.exports = router;
