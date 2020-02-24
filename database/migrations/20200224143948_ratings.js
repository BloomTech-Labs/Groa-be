exports.up = function(knex) {
  return knex.schema.createTable("Ratings", tbl => {
    tbl.increments();
    tbl.string("Date");
    tbl.string("Name");
    tbl.integer("Year");
    tbl.string("Letterboxd_URI");
    tbl.string("Rating");
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
  return knex.schema.dropTableIfExists("Ratings");
};
