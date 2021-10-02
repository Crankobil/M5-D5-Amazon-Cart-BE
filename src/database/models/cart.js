import sequelize from "../sequelize.js";

import s from "sequelize";

const { DataTypes } = s;

const Cart = sequelize.define("cart", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

export default Cart;