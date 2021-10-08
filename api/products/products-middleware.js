const db = require("../data/db-config");

const categoryNameToId = async (req, res, next) => {
  const { category } = req.body;
  if (category) {
    try {
      const currentCategory = await db("categories")
        .where("category_name", category)
        .first();
      req.category = currentCategory.category_id;
      next();
    } catch (err) {
      next({ status: 404, message: "Category not found" });
    }
  } else {
    next();
  }
};

const checkPriceInventoryType = async (req, res, next) => {
  const { price, inventory } = req.body;
  if (price) {
    if (typeof price !== "number") {
      next({ status: 400, message: "Price must be a number" });
    }
  } else if (inventory) {
    if (typeof inventory !== "number") {
      next({ status: 400, message: "Inventory must be a number" });
    }
  }
  next();
};

const checkProdIdExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await db("products").where("product_id", id).first();
    if (product) {
      next();
    } else {
      next({
        status: 404,
        message: "Product ID does not exist. Try Refreshing.",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  categoryNameToId,
  checkPriceInventoryType,
  checkProdIdExists,
};
