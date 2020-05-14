// const db = require("../database/dbConfig.js");

// module.exports = {
//   addToWatched,
//   getWatched,
//   getWatchedById,
//   getMovieByName,
//   addUploadToWatched,
// };
// // here out of laziness and for DS
// async function addToWatched(movie) {
//   await db("user_watched")
//     .select("*")
//     .where("movie_id", movie.movie_id)
//     .andWhere("user_id", movie.user_id)
//     .then((watched) => {
//       if (watched.length === 0) {
//         return db("user_watched").insert(movie, "id");
//       }
//     });
// }

// function getWatched(user_id) {
//   return db("user_watched").where("user_id", user_id);
// }

// function getWatchedById(id) {
//   return db("user_watched").where("movie_id", id).first();
// }

// function getMovieByName(upload) {
//   return db("movies as m")
//     .select("movie_id")
//     .where("primary_title", upload.primary_title)
//     .andWhere("start_year", upload.start_year);
// }

// async function addUploadToWatched(upload) {
//   let movie_id = await getMovieByName(upload);
//   await db("user_watched")
//     .select("*")
//     .where("movie_id", movie_id)
//     .andWhere("user_id", upload.user_id)
//     .then((watched) => {
//       if (watched.length === 0) {
//         return db("user_watched").insert(upload, "id");
//       }
//     });
// }
