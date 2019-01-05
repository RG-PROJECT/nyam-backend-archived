const express = require("express"),
      app = express(),
      morgan = require("morgan"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose")
      crypto = require('crypto');


const sha512 = (password) => {
  const salt = 'trace-excavation-frame';
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

// controller
const passport = require("./api/controller/passport")({sha512:sha512});

// api
const productRoutes = require("./api/routes/products"),
      orderRoutes = require("./api/routes/orders"),
      cardRoutes = require("./api/routes/cards"),
      userRoutes = require("./api/routes/users")();

const connect = () => {
  console.log("connect success!");
  const uri =
    "mongodb://godori:" +
    process.env.MONGO_ATLAS_PW +
    process.env.MONGO_ATLAS_ADDR;
  return mongoose.connect(
    uri,
    {
      useCreateIndex: true,
      useNewUrlParser: true 
    });
};


connect();

app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cards", cardRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // forward error request
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
