const router = require("express").Router();
const fs = require("fs"); // used to create Read and Write streams
const csv = require("csv-parser"); // used for parsing CSV files to JSON
const unzipper = require("unzipper"); // extracting files from a .zip
const fileUpload = require("express-fileupload"); // creating a temp path for files

router.use(
  fileUpload({
    parseNested: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
    cleanup: true,
  })
);

// model functions
const { addRating } = require("../models/ratings.js");
const { addReview } = require("../models/reviews.js");
const { addToWatched } = require("../models/watched.js");
const { addToWatchList } = require("../models/watch_list.js");
const { getUserById, getUserData } = require("../auth/users/users-model");

router.post("/:user_id/uploading", async (req, res) => {
  const tempFilePath = req.files.movies.tempFilePath;

  //https://www.npmjs.com/package/unzipper for docs on how to do this.
  fs.createReadStream(tempFilePath)
    .pipe(unzipper.Parse())
    .on("entry", function (entry) {
      const fileName = entry.path;

      /**
       * Cleans up a string with \r and \n in it.
       * @param {string} string - any string that you want to remove the `\n` characters from.
       * @returns {string}
       */
      function removeNewLines(string) {
        return string.replace(/\r?\n|\r/g, "");
      }

      /**
       * Creates unique temp file path, parses csv to json structure to match db schema.
       * @param {string} path - temp file path given from unzipper library
       * @param {string} name - name of file to add a unique part of the file name to access it
       */
      function createTempFilePath(path, name) {
        entry.pipe(fs.createWriteStream(path + "-" + name));
        entry
          // parsing csv -> json to insert
          .pipe(csv())
          // takes data from csv files to structure them into the correct format and types for db
          .on("data", function (data) {
            // updateable variable to make sure data types are correct before inserting into database
            let parsed = {
              date: new Date(data.Date + "Z"),
              name: data.Name,
              year: Number(data.Year),
              // letterboxd_uri: data["Letterboxd URI"],
              rating: data.Rating !== "" ? data.Rating * 1 : undefined, //
              user_id: req.params.user_id,
            };
            // seperating files
            switch (name) {
              case "ratings.csv":
                parsed = { ...parsed };
                addRating(parsed)
                  .then(() => null)
                  .catch((err) => console.log(err.message));
                break;
              case "reviews.csv":
                // may have to update rating data type based on Niki's response
                let cleanedReview = removeNewLines(data.Review);
                parsed = {
                  ...parsed,
                  // letterboxd_uri: data["Letterboxd URI"],
                  rewatch: data.Rewatch,
                  review: cleanedReview,
                  tags: data.Tags,
                  watched_date: data["Watched Date"],
                };
                addReview(parsed)
                  .then(() => null)
                  .catch((err) => console.log(err.message));
                break;
              case "watched.csv":
                parsed = {
                  date: new Date(data.Date + "Z"),
                  name: data.Name,
                  year: Number(data.Year),
                  letterboxd_uri: data["Letterboxd URI"],
                  user_id: req.params.user_id,
                };
                addToWatched(parsed)
                  .then(() => null)
                  .catch((err) => console.log(err.message));
                break;
              case "watchlist.csv":
                parsed = {
                  date: new Date(data.Date + "Z"),
                  name: data.Name,
                  year: Number(data.Year),
                  // letterboxd_uri: data["Letterboxd URI"],
                  user_id: req.params.user_id,
                };
                addToWatchList(parsed)
                  .then(() => null)
                  .catch((err) => console.log(err.message));
                break;
              default:
                let err = new Error(
                  "something went wrong in parsing that information"
                );
                res.status(400).json({ err });
            }
          });
      }

      // fancy if statement to run different functions based on file name.
      switch (fileName) {
        case "ratings.csv":
          createTempFilePath(tempFilePath, fileName);
          break;
        case "reviews.csv":
          createTempFilePath(tempFilePath, fileName);
          break;
        case "watched.csv":
          createTempFilePath(tempFilePath, fileName);
          break;
        case "watchlist.csv":
          createTempFilePath(tempFilePath, fileName);
          break;
        default:
          entry.autodrain();
      }
    });
  const user = await getUserById(req.params.user_id);
  await getUserData(user.user_name)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Something went wrong retrieving your information." });
    });
});

module.exports = router;
