const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// routes
const { auth, branch, order, product, staff, stock } = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));


app.use("/auth", auth);
app.use("/branch", branch);
app.use("/staff", staff);
app.use("/order", order);
app.use("/stock", stock);
app.use("/product", product);

app.use((err, req, res, next) => {
  console.log("error handler", err.message);
  if (!err.errorCode) {
    err.errorCode = 500;
  }
  const resData = {
    flag: "error",
    status: err.errorCode,
    message: err.message,
  };
  res.status(err.errorCode).json(resData);
});

app.listen(8000, () => {
  console.log(`${process.env.NODE_ENV} server run on port ${process.env.PORT}`);
});
