const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  getUserById,
  getUserDataByOktaId,
  //getUserData,
};

function add(user) {
  return db("users")
    .insert(user, "user_id")
    .then((ids) => {
      const [user_id] = ids;
      return db("users").where({ user_id }).first();
    })
    .catch((error) => {
      console.log(error);
    });
}

function findBy(email) {
  return db("users").where("email", email).first();
}

function getUserById(user_id) {
  return db("users").where({ user_id }).select("*").first();
}

async function getUserDataByOktaId(okta_id) {
  let user = await getUserById(okta_id).select("*");
  await db("user_ratings")
    .where("user_id", user.user_id)
    .then((ratings) => {
      user = {
        ...user,
        ratings,
      };
    });
  await db("user_watchlist")
    .where("user_id", user.user_id)
    .then((watchlist) => {
      user = {
        ...user,
        watchlist,
      };
    });
  return user;
}

// async function getUserData(email) {
//   let user = await findBy(email).select("*");
//   await db("user_ratings")
//     .where("user_id", user.user_id)
//     .then((ratings) => {
//       user = {
//         ...user,
//         ratings,
//       };
//     });
//   await db("user_watchlist")
//     .where("user_id", user.user_id)
//     .then((watchlist) => {
//       user = {
//         ...user,
//         watchlist,
//       };
//     });
//   return user;
// }
