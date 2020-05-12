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
router.post("/register", (req, res) => {

  console.log('REQUESTSSS', req.body);
  const { firstName, lastName, email } = req.body;

  // user object to be passed to okta api to create a new user, (must be in exact order per api guidelines)
  const newUser = {
    profile: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      login: email,
    },
  };

  //okta api method that creates new user
  client.createUser(newUser,)
  .then(user => {

    //user object that will be posted to GROA BE to keep recommendation model working
    const userTable = {
      user_id: user.id,
    }

    Users.add(userTable)
      .then((user) => {
        res.status(201).json({
          message: `Registration successful, please confirm you Email to complete account registration!`,
          user_id: user.user_id,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to register new user 1",
          error: err,
        });
      });
  })
  .catch(err => res.status(500).json({error: err}));
})


router.post("/login", authentincationRequired, (req, res) => {
  console.log('||||||||||||||||||||||||||||||OKTA',req.body);
  let {id} = req.body;

  const userTable = {
    user_id: id,
  }

  console.log('Users.getUserDataByOktaID', Users.getUserDataByOktaId(id));

  async function isUserInGroa(Users, oktaId){    
    let myUser = await Users.getUserDataByOktaId(oktaId);
    console.log('*************', myUser)
    return myUser;
  }
  
   if(!isUserInGroa(Users, id)){
    console.log('[[[[[[[[[[[[[[[[[[',userTable)

    Users.add(userTable)
      .then(() => {
        Users.getUserDataByOktaId(id)
        .then(user => {
          res.status(200).json({
            message: `${user.user_name} Logged In!`,
            user_id: user.user_id,
            ratings: user.ratings,
            watchlist: user.watchlist,
          });
        })
        .catch(error => {
          console.log("Error Fetching User Info after okta logging", error);
          res.status(500).json({ errorMessage: "Error Fetching User Info" });
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to register Authenticated users",
          error: err,
        });
      });
  } else {
    Users.getUserDataByOktaId(id)
    .then(user => {
      res.status(200).json({
        message: `${user.user_name} Logged In!`,
        user_id: user.user_id,
        ratings: user.ratings,
        watchlist: user.watchlist,
      });
    })
    .catch(error => {
      res.status(500).json({ 
        errorMessage: "Error Fetching User Info",
        message: error,
     });
    })
  }  
})


module.exports = router;