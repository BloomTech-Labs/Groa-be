const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('recommendations')
    .then(function () {
      // Inserts seed entries
      return knex('recommendations').insert(
      {
        user_id: 3,
        recommendation_id: "f128ee12def6a350788d11e6a0125049",
        recommendation_json: JSON.stringify([
          {
            "Title": "The Killing", 
            "Year": 1956, 
            "IMDB URL": "https://www.imdb.com/title/tt0049406/", 
            "Mean Rating": 8.0,
            "Votes": 76183, 
            "Similarity": 0.5655419826507568, 
            "ID": "0049406", 
            "Gem": false, 
            "Poster URL": "None"
          }, 
          {
            "Title": "Do the Right Thing",
            "Year": 1989,
            "IMDB URL": "https://www.imdb.com/title/tt0097216/",
            "Mean Rating": 7.9, 
            "Votes": 78577, 
            "Similarity": 0.565169095993042, 
            "ID": "0097216", 
            "Gem": false, 
            "Poster URL": "/63rmSDPahrH7C1gEFYzRuIBAN9W.jpg"
          },
        ]),
        date: "2020-03-13T04:00:00.000Z",
        model_type: "ratings model"
      }
    );
    });
};
