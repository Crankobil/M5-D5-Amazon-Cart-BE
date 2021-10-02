import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { connectDB } from "./database/sequelize.js";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import categoriesRouter from "./services/categories/index.js";
import usersRouter from "./services/users/index.js";
import cartRouter from "./services/cart/index.js";



const server = express()

const {PORT=3003} = process.env;

server.use(cors());
server.use(express.json());

server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/category", categoriesRouter)
server.use("/users", usersRouter)
server.use("/cart", cartRouter)
server.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is listening on port ${PORT}`)
    
})

server.on('error', () =>{
    console.log('Server is stopped', error)
})

console.table(listEndpoints(server));