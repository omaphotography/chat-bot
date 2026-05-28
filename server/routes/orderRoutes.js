const express =
  require("express");

const router =
  express.Router();

const {

  createOrder,

  getUserOrders,

  getAllOrders,

  cancelOrder,

  updateOrderStatus,

} = require(
  "../controllers/orderController"
);

// CREATE ORDER
router.post(
  "/",
  createOrder
);

// USER ORDERS
router.get(
  "/user/:userId",
  getUserOrders
);

// ADMIN ORDERS
router.get(
  "/",
  getAllOrders
);

// CANCEL ORDER
router.put(
  "/cancel/:id",
  cancelOrder
);

// UPDATE ORDER STATUS
router.put(
  "/status/:id",
  updateOrderStatus
);

module.exports =
  router;