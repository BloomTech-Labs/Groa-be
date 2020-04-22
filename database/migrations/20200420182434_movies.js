exports.up = function (knex) {
  return knex.schema.createTable("movies", (tbl) => {
    tbl.increments();
    tbl.string("title_type");
    tbl.string("primary_title");
    tbl.string("original_title");
    tbl.boolean("is_adult");
    tbl.integer("start_year");
    tbl.integer("end_year");
    tbl.integer("runtime_minutes");
    tbl.string("genres");
    tbl.string("poster_url");
    tbl.float("average_rating");
    tbl.integer("num_votes");
    tbl.string("original_language");
    tbl.string("trailer_url");
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("movies")
    .dropTableIfExists("imdb_movies");
};
