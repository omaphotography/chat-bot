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

app.use(cors());

app.use(express.json());

// HOME
app.get("/", (req, res) => {

  res.send(
    "ShopBot API Running..."
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

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});