const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const client = require('../../config/oktaClient');
const authentincationRequired = require('../../config/authenticationRequired');

/**
 * @api {post} /api/users/register
 * @apiName Register a user
 * @apiGroup Auth
 *
 * @apiParam {string} firstName **Required** to post new user to okta's point
 * @apiParam {string} lastname **Required** required to post new user to okta's enpoint
 * @apiParam {string} email  _Unique_ | A valid email of a user, user will have to authenticate email to veryfy account
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
    "message": "Registration successful user@email.com, please confirm you Email to complete account registration!",
    "user_id": 3175,
    "okta_id": "uaxv8xvs468Z3ZaTMzt4x6"
}
 *
 * @apiError UniqueUsernameError The <code>req.body.user_name</code> is already in database.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    errorMessage: "Username already in use!"
 *  }
 */
router.post("/login", authentincationRequired, (req, res) => {
  let {id} = req.body;  
  //user object to be posted to Groa DB if id isn't found
  const newUser = {
    user_id: id,
  }  

  Users.getUserDataByOktaId(id)
    .then(res => {
      //USER EXISTS IN GROA DB, RETURN INFO
      res.status(200).json({
        message: `${user.user_name} Logged In!`,
        user_id: user.user_id,
        ratings: user.ratings,
        watchlist: user.watchlist,
        newUser: false,
      });
    })      
    .catch(err => {
      //ADD NEW USER TO GROA DB
      Users.add(newUser)
      .then(() => {
        Users.getUserDataByOktaId(id)
        .then(user => {
          res.status(200).json({
            message: `${user.user_name} Logged In!`,
            user_id: user.user_id,
            ratings: user.ratings,
            watchlist: user.watchlist,
            newUser: true,
          });
        })
        .catch(error => {
          res.status(500).json({ 
            errorMessage: "Error Adding new User after Okta registration",
         });
        })
      })
      .catch(err => {
          res.status(500).json({ errorMessage: "LOGIN/REGISTRATION FAILED" });
      })
    })
})

module.exports = router;