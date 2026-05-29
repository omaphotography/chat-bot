const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const text =
      message.toLowerCase();

    let reply =
      "I can help you with shopping, laptops, phones, delivery and orders.";

    // GREETING
    if (
      text === "hi" ||
      text === "hello"
    ) {

      reply =
        "Hello 👋 Welcome to ShopBot AI. What would you like to buy today?";

    }

    // BUYING
    else if (
      text.includes("buy") ||
      text.includes("shop")
    ) {

      reply =
        "Great 😊 What product are you looking for? We have laptops, phones, gaming products and accessories.";

    }

    // LAPTOP
    else if (
      text.includes("laptop")
    ) {

      reply =
        "We have gaming laptops, student laptops and business laptops available.";

    }

    // PHONE
    else if (
      text.includes("phone") ||
      text.includes("iphone") ||
      text.includes("android")
    ) {

      reply =
        "We have iPhones, Samsung phones and Android devices available.";

    }

    // DELIVERY
    else if (
      text.includes("delivery")
    ) {

      reply =
        "Delivery takes about 2 to 5 business days.";

    }

    // PAYMENT
    else if (
      text.includes("payment")
    ) {

      reply =
        "We accept card payments and online transfers.";

    }

    // ORDER
    else if (
      text.includes("order")
    ) {

      reply =
        "You can place your order directly from the cart page.";

    }

    res.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply:
        "Server error occurred.",
    });

  }

});

module.exports = router;