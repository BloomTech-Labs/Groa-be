const express = require("express");
const axios = require("axios");
const { authToken } = require("../auth/authenticate-middleware");
const router = express.Router();

const Recommendations = require("./recommendations-model");

/**
 * @api {get} /users/:user_id/recommendations
 * @apiName Get New Movie Recommendations
 * @apiGroup Recommendations
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *  {
 *    "recommendation_json": [
 *      {
 *        "Title": "That Obscure Object of Desire",
 *        "Year": 1977,
 *        "IMDB URL": "https://www.imdb.com/title/tt0075824/",
 *        "Mean Rating": 7.9,
 *        "Votes": 18958,
 *        "Similarity": 0.5469637513160706,
 *        "ID": "0075824",
 *        "Gem": false,
 *        "Poster URL": "/9iUdC4dftkjYSBUJq5DAxC6WqB9.jpg"
 *      },
 *      {
 *        "Title": "La Dolce Vita",
 *        "Year": 1960,
 *        "IMDB URL": "https://www.imdb.com/title/tt0053779/",
 *        "Mean Rating": 8,
 *        "Votes": 61072,
 *        "Similarity": 0.5398253202438354,
 *        "ID": "0053779",
 *        "Gem": false,
 *        "Poster URL": "/mZJ25Th65B2KXM57uIiEzO3Aw81.jpg"
 *      },
 *      {
 *        "Title": "Shadows",
 *        "Year": 1958,
 *        "IMDB URL": "https://www.imdb.com/title/tt0053270/",
 *        "Mean Rating": 7.3,
 *        "Votes": 9380,
 *        "Similarity": 0.5341751575469971,
 *        "ID": "0053270",
 *        "Gem": false,
 *        "Poster URL": "/emSTzEr2qdo3lV14ZQ3uIYsqHJS.jpg"
 *      },
 *      {
 *        "Title": "Torment",
 *        "Year": 1944,
 *        "IMDB URL": "https://www.imdb.com/title/tt0036914/",
 *        "Mean Rating": 7.3,
 *        "Votes": 2968,
 *        "Similarity": 0.526555597782135,
 *        "ID": "0036914",
 *        "Gem": false,
 *        "Poster URL": "/6QYS8bquBzpnRatOfMDXqB7ECU.jpg"
 *      },
 *      {
 *        "Title": "Stagecoach",
 *        "Year": 1939,
 *        "IMDB URL": "https://www.imdb.com/title/tt0031971/",
 *        "Mean Rating": 7.9,
 *        "Votes": 39835,
 *        "Similarity": 0.5156384110450745,
 *        "ID": "0031971",
 *        "Gem": false,
 *        "Poster URL": "/wvyS90AJsztvX5wxpDSjURad9yl.jpg"
 *      }
 *    ]
 *  }
 *
 */
router.get("/:id/recommendations", (req, res) => {
  console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",req)
  const { id } = req.params;
  Recommendations.getLatestRecommendations(id)
    .then((res) => {
      console.log(res)
      if(res){
        const recParams = res
      }
    })
    .catch((err) => {
      console.log(err);
    });
  axios
    .post(
      process.env.RECOMMENDATION_URL,
      {
        user_id: id,
        num_recs: 50,
        good_threshold: 3.5,
        bad_threshold: 2.5,
        harshness: 1,
      },
      { headers: { "Content-Type": "application/json" } }
    )
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
 * @api {get} /users/:user_id/recommended
 * @apiName Get Already Recommended Movies
 * @apiGroup Recommendations
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *  {
 *    "recommendation_json": [
 *      {
 *        "Title": "That Obscure Object of Desire",
 *        "Year": 1977,
 *        "IMDB URL": "https://www.imdb.com/title/tt0075824/",
 *        "Mean Rating": 7.9,
 *        "Votes": 18958,
 *        "Similarity": 0.5469637513160706,
 *        "ID": "0075824",
 *        "Gem": false,
 *        "Poster URL": "/9iUdC4dftkjYSBUJq5DAxC6WqB9.jpg"
 *      },
 *      {
 *        "Title": "La Dolce Vita",
 *        "Year": 1960,
 *        "IMDB URL": "https://www.imdb.com/title/tt0053779/",
 *        "Mean Rating": 8,
 *        "Votes": 61072,
 *        "Similarity": 0.5398253202438354,
 *        "ID": "0053779",
 *        "Gem": false,
 *        "Poster URL": "/mZJ25Th65B2KXM57uIiEzO3Aw81.jpg"
 *      }
 *    ]
 *  }
 *
 */

router.get("/:id/recommended", (req, res) => {
  const { id } = req.params;
  Recommendations.getAllRecommendations(id)
    .then((recommendations) => {
      if (recommendations) {
        res.status(200).json(recommendations);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
        errorMessage:
          "Could not retrieve any recommendations for your account, try uploading a file.",
      });
    });
});

/**
 * @api {get} /users/:user_id/recommendation-history
 * @apiName Get ALL Previously Recommended Movies
 * @apiGroup Recommendations
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *  {
 *    "user_id": 48485452324,
 *    "recommendation_id": "a39c6ee234beecf3e708267a8fd56efde2907",
 *    "recommendation_json": [
 *      {
 *        "Title": "That Obscure Object of Desire",
 *        "Year": 1977,
 *        "IMDB URL": "https://www.imdb.com/title/tt0075824/",
 *        "Mean Rating": 7.9,
 *        "Votes": 18958,
 *        "Similarity": 0.5469637513160706,
 *        "ID": "0075824",
 *        "Gem": false,
 *        "Poster URL": "/9iUdC4dftkjYSBUJq5DAxC6WqB9.jpg"
 *      },
 *      {
 *        "Title": "La Dolce Vita",
 *        "Year": 1960,
 *        "IMDB URL": "https://www.imdb.com/title/tt0053779/",
 *        "Mean Rating": 8,
 *        "Votes": 61072,
 *        "Similarity": 0.5398253202438354,
 *        "ID": "0053779",
 *        "Gem": false,
 *        "Poster URL": "/mZJ25Th65B2KXM57uIiEzO3Aw81.jpg"
 *      },
 *        "date": "2020-03-26T19:55:09.835Z",
 *        "model_type": "ratings model"
 *    ]
 *  }
 *
 */

// router.get("/:id/recommendation-history", (req, res) => {
//   const { id } = req.params;

//   Recommendations.getAllRecommendations(id)
//     .then((recommendations) => {
//       if (recommendations) {
//         res.status(200).json(recommendations);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         error,
//         errorMessage:
//           "Could not retrieve any recommendations for your account, try uploading a file.",
//       });
//     });
// });

module.exports = router;
