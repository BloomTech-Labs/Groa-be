exports.up = function(knex) {
  return knex.schema.createTable("Reviews", tbl => {
    tbl.increments();
    tbl.date("Date");
    tbl.string("Name");
    tbl.integer("Year");
    tbl.string("Letterboxd_URI");
    tbl.float("Rating");
    tbl.string("Rewatch");
    tbl.string("Review");
    tbl.string("Tags");
    tbl.string("Watched_Date");
    tbl
      .integer("userid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Reviews");
};
