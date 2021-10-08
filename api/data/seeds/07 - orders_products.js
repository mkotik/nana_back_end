const orders_products = [
  { order_id: 1, product_id: 1, quantity: 1, soldFor: 7.5 },
  { order_id: 1, product_id: 3, quantity: 2, soldFor: 8.0 },
  { order_id: 2, product_id: 1, quantity: 5, soldFor: 7.5 },
  { order_id: 2, product_id: 2, quantity: 1, soldFor: 7.0 },
  { order_id: 2, product_id: 6, quantity: 2, soldFor: 9.0 },
];

exports.orders_products = orders_products;

exports.seed = function (knex) {
  return knex("orders_products").insert(orders_products);
};
