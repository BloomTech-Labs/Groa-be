const db = require("../database/dbConfig.js");

module.exports = {
  addRating,
  getRatingById,
  getRatings,
  getMovieByName,
  addUploadRating,
};

/**
 * Inserts or updates a rating to the database for the Groa site
 * @param {object} rating - date, movie_id, start_year, rating, user_id
 * @returns {ratedMovie}
 */
async function addRating(rating) {
  const ratings = await db("user_ratings")
    .select("*")
    .where("movie_id", rating.movie_id)
    .andWhere("user_id", rating.user_id);

  if (ratings.length === 0) {
    const ids = await db("user_ratings").insert(rating, "rating_id");

    const [id] = ids;
    const added = await getRatingById(id);
    return added;
  } else {
    const ids = await db("user_ratings")
      .where("movie_id", rating.movie_id)
      .andWhere("user_id", rating.user_id)
      .update("rating", rating.rating, "rating_id");

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
  return db("user_ratings").where("rating_id", id).first();
}

/**
 * Returns an array of movie ratings by user_id with their posters
 * @param {number} user_id user_groa_ratings user_id
 * @returns [{ratedMovie},{ratedMovie},...]
 */
function getRatings(user_id) {
  return db("user_ratings as ur")
    .join("movies as m", "ur.movie_id", "=", "m.movie_id")
    .select(
      "ur.rating_id",
      "ur.date",
      "m.primary_title",
      "m.start_year",
      "m.description",
      "ur.rating",
      "ur.user_id",
      "m.poster_url",
      "m.trailer_url",
      "m.genres"
    )
    .where("ur.user_id", user_id);
}

function getMovieByName(upload) {
  return db("movies as m")
    .select("movie_id")
    .where("primary_title", upload.primary_title)
    .andWhere("start_year", upload.start_year);
}

async function addUploadRating(upload) {
  let movie_id = await getMovieByName(upload);

  const ratings = await db("user_ratings")
    .select("*")
    .where("movie_id", movie_id)
    .andWhere("user_id", rating.user_id);

  if (ratings.length === 0) {
    const ids = await db("user_ratings").insert(rating, "rating_id");

    const [id] = ids;
    const added = await getRatingById(id);
    return added;
  } else {
    const ids = await db("user_ratings")
      .where("movie_id", movie_id)
      .andWhere("user_id", rating.user_id)
      .update("rating", rating.rating, "rating_id");

    const [id] = ids;
    const updated = await getRatingById(id);
    return updated;
  }
}
