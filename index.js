const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const userRouter = require("./routes/v1/user.route");
const errorHandler = require("../auto/middleware/errorHandler");
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// router
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Random user server");
});

app.all("*", (req, res) => {
  res.send("No Route Found!");
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
