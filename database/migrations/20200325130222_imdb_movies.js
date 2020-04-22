exports.up = function(knex) {
  return knex.schema.createTable("imdb_movies", tbl => {
    tbl.increments();
    tbl.string("primary_title");
    tbl.integer("year");
    tbl.string("poster_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("imdb_movies");
};
