require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./router/auth.router");
const homeRouter = require("./router/home.router");
const cookieParser = require("cookie-parser");
const ErrorMiddleware = require("./middleware/Error.middleware");


const app = express();
connectDB();
app.use(express.json());
app.use(cors(
{ origin: "http://localhost:5174",
    credentials: true,}
));

app.use(cookieParser());


app.use("/api/USER", authRouter);
app.use("/api/home", homeRouter);


app.use(ErrorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});