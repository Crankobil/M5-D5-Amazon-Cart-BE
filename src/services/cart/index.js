import express from "express";
import database from "../../database/index.js";
import sequelize from "sequelize";

const { Cart, Product } = database;
const cartRouter = express.Router();

/**
 * [{
 * "productId":1,
 * "unitary_qty":"2"
 * }
 * ]
 *
 *
 */

 cartRouter.route("/:userId").get(async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      where: { userId: req.params.userId },
      include: Product,
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("cart.id")), "unitary_qty"],
      ],
      group: ["productId", "product.id"],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default cartRouter;