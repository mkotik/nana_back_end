const orders = [
  {
    first_name: "Marat",
    last_name: "Kotik",
    email: "mkotik97@gmail.com",
    shipping_city: "Matawan",
    shipping_state: "NJ",
    shipping_address: "14 Bramble Lane",
    shipping_zip: "07747",
    shipping_apartment: null,
    shipping_id: 1,
    status: "Active",
    billing_city: "Matawan",
    billing_state: "NJ",
    billing_address: "14 Bramble Lane",
    billing_zip: "07747",
    billing_apartment: null,
  },
  {
    first_name: "Sarah",
    last_name: "Silverman",
    email: "ssilverman@gmail.com",
    shipping_city: "New York",
    shipping_state: "NY",
    shipping_address: "162 W 36th St",
    shipping_zip: "10018",
    shipping_apartment: "2B",
    shipping_id: 2,
    status: "Completed",
    billing_city: "Whippany",
    billing_state: "NJ",
    billing_address: "24 Kearney Ave",
    billing_zip: "07981",
    billing_apartment: null,
  },
];

exports.orders = orders;

exports.seed = function (knex) {
  return knex("orders").insert(orders);
};
