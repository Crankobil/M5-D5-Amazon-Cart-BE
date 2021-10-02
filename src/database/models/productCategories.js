import sequelize from "../sequelize.js";
import s from "sequelize";

const { DataTypes } = s;

const productCategory = sequelize.define("productCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// ArticleCategory.sync({ force: true });

export default productCategory;