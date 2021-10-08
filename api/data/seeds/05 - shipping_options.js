const shipping_options = [
  { shipping_name: "Standard Shipping", cost: 4.5 },
  { shipping_name: "Priority Shipping", cost: 9.5 },
  { shipping_name: "2-Day Shipping", cost: 15.0 },
];

exports.shipping_options = shipping_options;

exports.seed = function (knex) {
  return knex("shipping_options").insert(shipping_options);
};
