const express = require("express");

const cors = require("cors");

require("dotenv").config();

const productRoutes =
  require("./routes/productRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const authRoutes =
  require("./routes/authRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const app = express();


// CORS
app.use(
  cors({
    origin: "*",
  })
);


// BODY PARSER
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {

  res.send(
    "✅ ShopBot API Running..."
  );

});


// PRODUCT ROUTES
app.use(
  "/api/products",
  productRoutes
);


// CHATBOT ROUTES
app.use(
  "/api/chat",
  chatRoutes
);


// AUTH ROUTES
app.use(
  "/api/auth",
  authRoutes
);


// ORDER ROUTES
app.use(
  "/api/orders",
  orderRoutes
);


// ERROR HANDLER
app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({
    error:
      "Internal Server Error",
  });

});


// PORT
const PORT =
  process.env.PORT || 10000;


// START SERVER
app.listen(PORT, () => {

  console.log(
    `✅ Server running on port ${PORT}`
  );

});