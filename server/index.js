const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const blogRouter = require("./src/blogRouter/index");
const userRouter=require("./src/userRouter/index")

const dbConfig = require("./src/config/dbConfig");

const app = express();
app.use(express.json());
app.use(cors());

const portValue = process.env.PORT || 5004;
const monogooseUrl = process.env.MONGO_URL;

app.use("/api/user",userRouter);
app.use("/api/blog", blogRouter);
app.listen(portValue, () => console.log("Server connected successfully"));
