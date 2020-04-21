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
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return db("users")
        .where({ id })
        .first();
    });
}

function findBy(user_name) {
  return db("users")
    .where("user_name", user_name)
    .first();
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findUsers() {
  return db("users")
    .select("user_name", "id")
}

async function getUserData(user_name) {
  let user = await findBy(user_name)
  .select("*")
  await db("user_ratings")
  .where("user_id", user.id)
  .then(ratings => {
    user = {
      ...user, ratings
    }
  })
  await db("user_watchlist")
  .where("user_id", user.id)
  .then(watchlist => {
    user = {
      ...user, watchlist
    }
  })
  return user;
};

