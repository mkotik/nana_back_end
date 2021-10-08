const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const productsRouter = require("./products/products-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/products", productsRouter);

// server.use("/", (req, res) => {
//   res.status(200).json({ message: "welcome to the api" });
// });

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
