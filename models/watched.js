const db = require("../database/dbConfig.js");

module.exports = {
  addToWatched,
  getWatched,
  getWatchedById,
};
// here out of laziness and for DS
async function addToWatched(movie) {
  await db("user_watched")
    .select("*")
    .where("letterboxd_uri", movie.letterboxd_uri)
    .andWhere("user_id", movie.user_id)
    .then((watched) => {
      if (watched.length === 0) {
        return db("user_watched").insert(movie, "id");
      }
    });
}

function getWatched(user_id) {
  return db("user_watched").where("user_id", user_id);
}

function getWatchedById(id) {
  return db("user_watched").where("id", id).first();
}
