const db = require("../../database/dbConfig.js");

module.exports = {
  addRating,
  getRatingById,
  getRatings,
};

/**
 * Inserts or updates a rating to the database for the Groa site
 * @param {object} rating - date, name, year, rating, user_id
 * @returns {ratedMovie}
 */
async function addRating(rating) {
  const ratings = await db("user_ratings")
    .select("*")
    .where("name", rating.name)
    .andWhere("year", rating.year)
    .andWhere("user_id", rating.user_id);

  if (ratings.length === 0) {
    const ids = await db("user_ratings").insert(rating, "id");

    const [id] = ids;
    const added = await getRatingById(id);
    return added;
  } else {
    const ids = await db("user_ratings")
      .where("name", rating.name)
      .andWhere("year", rating.year)
      .andWhere("user_id", rating.user_id)
      .update("rating", rating.rating, "id");

    const [id] = ids;
    const updated = await getRatingById(id);
    return updated;
  }
}

/**
 * Returns a movie ratings by id
 * @param {number} id user_groa_ratings id
 * @returns {ratedMovie}
 */
function getRatingById(id) {
  return db("user_ratings").where("id", id).first();
}

/**
 * Returns an array of movie ratings by user_id with their posters
 * @param {number} user_id user_groa_ratings user_id
 * @returns [{ratedMovie},{ratedMovie},...]
 */
function getRatings(user_id) {
  return db("user_ratings as ur")
    .innerJoin("movies", {
      "movies.primary_title": "ur.name",
      "movies.start_year": "ur.year",
      "movies.poster_url": "ur.poster"
    })
    .select(
      "ur.rating_id",
      "ur.date",
      "ur.name",
      "ur.year",
      "ur.rating",
      "ur.user_id",
      "ur.poster"
    )
    .where("ur.user_id", user_id);
}
