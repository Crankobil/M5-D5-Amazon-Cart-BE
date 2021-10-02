import express from "express";
import database from "../../database/index.js"
import s from "sequelize";

const { Op } = s;
const productsRouter = express.Router();
const {Product, Category, productCategories } = database

productsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
        const data = await Product.findAll({
          include: [
            {
              model: Category,
              where: req.query.category
                ? {
                    name: { [Op.iLike]: req.query.category },
                  }
                : {},
            },
          ],
          where: req.query.search
            ? {
                [Op.or]: [{ name: { [Op.iLike]: "%" + req.query.search + "%" } }, { description: { [Op.iLike]: "%" + req.query.search + "%" } }, { brand: { [Op.iLike]: "%" + req.query.search + "%" } }],
              }
            : {},
          attributes: { exclude: "categoryId" },
          offset: parseInt(req.query.offset) | 0,
          limit: parseInt(req.query.limit) | 10,
        });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
      try{
    const { categoryId, ...rest } = req.body;
      const product = await Product.create(rest);
      const productCategories = await productCategories.create({
        categoryId,
        productId: product.id,
      });

      res.send({ product, productCategories });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

productsRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("Deleted");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default productsRouter;