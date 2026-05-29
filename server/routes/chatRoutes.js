const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const text =
      message.toLowerCase();

    let reply =
      "I can help you with shopping, laptops, phones, orders, delivery and payments.";

    // LAPTOP
    if (
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
        "We have iPhones, Samsung devices and Android phones available.";

    }

    // PRICE
    else if (
      text.includes("price")
    ) {

      reply =
        "Our products are affordable and available in different price ranges.";

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

    // HELLO
    else if (
      text.includes("hello") ||
      text.includes("hi")
    ) {

      reply =
        "Hello 👋 Welcome to ShopBot AI. How can I help you today?";

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