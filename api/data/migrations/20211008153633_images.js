exports.up = async function (knex) {
  await knex.schema.createTable("images", (tbl) => {
    tbl.increments("image_id");
    tbl.string("image_url").notNullable();
    tbl.boolean("primary").defaultTo("false");
    tbl
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("images");
};
