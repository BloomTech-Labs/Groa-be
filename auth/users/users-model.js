const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  getUserById,
  findUsers,
  getUserData
};

function add(user) {
  return db("users")
    .insert(user, "user_id")
    .then(ids => {
      const [user_id] = ids;
      return db("users")
        .where({ user_id })
        .first();
    }).catch(error => {
      console.log(error)
    });
}

function findBy(user_name) {
  return db("users")
    .where("user_name", user_name)
    .first();
}

function getUserById(user_id) {
  return db("users")
          .where({ user_id })
          .select('*')
          .first();
}

function findUsers() {
  return db("users")
    .select("user_name", "user_id")
}

async function getUserData(user_name) {
  let user = await findBy(user_name)
  .select("*")
  await db("user_ratings")
  .where("user_id", user.user_id)
  .then(ratings => {
    user = {
      ...user, ratings
    }
  })
  await db("user_watchlist")
  .where("user_id", user.user_id)
  .then(watchlist => {
    user = {
      ...user, watchlist
    }
  })
  return user;
};