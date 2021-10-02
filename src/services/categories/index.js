import express from "express";
import database from "../../database/index.js"
import s from "sequelize";

const { Op } = s;
const categoriesRouter = express.Router();
const {Category} = database

categoriesRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll({
        where: req.query.search
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: `%${req.query.search}%` } },
                { category: { [Op.iLike]: `%${req.query.search}%` } },
              ],
            }
          : {},
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Category.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  categoriesRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Category.update(req.body, {
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
      const rows = await Category.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default categoriesRouter;