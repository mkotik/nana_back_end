exports.up = async function (knex) {
  await knex.schema.createTable("products", (tbl) => {
    tbl.increments("product_id");
    tbl.string("name").notNullable();
    tbl.string("description");
    tbl.float("price").notNullable();
    tbl.boolean("featured").defaultTo("false");
    tbl.string("smells_like");
    tbl.string("exfoliation");
    tbl.integer("inventory");
    tbl
      .integer("category")
      .unsigned()
      .notNullable()
      .references("category_id")
      .inTable("categories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("products");
};
