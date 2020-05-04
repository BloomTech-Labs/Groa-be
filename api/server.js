const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../auth/users/users-router.js");
const uploadingRouter = require("../routers/uploading-router.js");
const recommendationsRouter = require("../routers/recommendations-router.js");
const groaUserRatingRouter = require("../routers/groa-user-rating-router.js");
const groaWatchListRouter = require("../routers/groa-watchlist-router.js");
const movieRouter = require("../routers/movies-router.js");

const server = express();

server.use(helmet());
server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use(
  "/api/users",
  userRouter,
  // these should all be protected routes
  uploadingRouter,
  recommendationsRouter,
  groaUserRatingRouter,
  groaWatchListRouter,
  movieRouter
);

/**
 * @api {get} /
 * @apiName Test if Server is Running
 * @apiGroup Server
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  "Welcome to the Backend of Groa"
 *
 * @apiErrorExample {string} Error-Response:
 *  HTTP/1.1 500
 *
 *  "Error: Couldn't connect to server"
 *
 */
server.get("/", (req, res) => {
  res.status(200).json("Welcome to the Backend of Groa");
});

module.exports = server;
