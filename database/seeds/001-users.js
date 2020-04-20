const { truncateTable } = require("../helpers/prepTestDB");
const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return truncateTable("users")
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_name: "blubsbunny",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "blubsbunny@gmail.com"
        },
        {
          user_name: "moviedatascience",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "moviedatascience@gmail.com"
        },
        {
          user_name: "gustydad",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "gustydad@gmail.com"
        },
        {
          user_name: "catbirdseat",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "catbirdseat@email.com"
        },
        {
          user_name: "livinlarge",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "livinlarge@email.com"
        },
      ]);
    });
};
