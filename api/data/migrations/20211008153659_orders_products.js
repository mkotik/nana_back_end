exports.up = async function (knex) {
  await knex.schema.createTable("orders_products", (tbl) => {
    tbl.increments("pair_id");
    tbl
      .integer("order_id")
      .unsigned()
      .notNullable()
      .references("order_id")
      .inTable("orders")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("product_id")
      .inTable("products")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.integer("quantity").unsigned().notNullable();
    tbl.float("soldFor").unsigned().notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("orders_products");
};
