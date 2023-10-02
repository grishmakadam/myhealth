require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users");
const cartRouter=require("./routes/carts")
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlparser: true });
const db = mongoose.connection;

db.once("open", () => console.log("connected"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/cart",cartRouter)
app.listen(7000, () => console.log("listening"));
