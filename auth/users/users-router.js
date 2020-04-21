const bcrypt = require("bcryptjs");
const express = require("express");
const { signToken } = require("../authenticate-middleware.js");
const router = express.Router();

const Users = require("./users-model");

/**
 * @api {post} /api/users/register
 * @apiName Register a user
 * @apiGroup Auth
 *
 * @apiParam {string} username **Required** | _Unique_ | The desired username of a new user
 * @apiParam {string} password **Required** | A password of at least 6 characters
 * @apiParam {string} email  _Unique_ | A valid email of a user
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "message": "Registration successful potatochip!",
 *    "id": 31501823437723
 *  }
 *
 * @apiError UniqueUsernameError The <code>req.body.user_name</code> is already in database.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    errorMessage: "Username already in use!"
 *  }
 */
router.post("/register", (req, res) => {
  let userData = req.body;
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userData.password, ROUNDS);
  userData.password = hash;
  Users.findBy(userData.user_name)
    .then((user) => {
      if (!user) {
        Users.add(userData).then((user) => {
          res.status(200).json({
            message: `Registration successful ${user.user_name}!`,
            user_id: user.user_id,
          });
        });
      } else {
        res.status(400).json({ errorMessage: "Username already in use!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Failed to register new user" });
    });
});

/**
 * @api {post} /api/users/login
 * @apiName Login a user
 * @apiGroup Auth
 *
 * @apiParam {string} username **Required** | _Unique_ | Must match an existing user
 * @apiParam {string} password **Required** | Must match password of username
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "message": "Registration successful potatochip!",
 *    "id": 31501823437723
 *  }
 *
 * @apiError AuthenticationFailed User credentials are not valid.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    "message": "Failed to login"
 *  }
 */
router.post("/login", (req, res) => {
  let { user_name, password } = req.body;
  Users.getUserData(user_name)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          message: `${user.user_name} Logged In!`,
          token,
          user_id: user.user_id,
          ratings: user.ratings,
          watchlist: user.watchlist,
        });
      } else {
        res.status(401).json({ message: "Failed to login" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Failed to retrieve credentials " });
    });
});

module.exports = router;
