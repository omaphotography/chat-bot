const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const text =
      message.toLowerCase();

    let reply =
      "I can help you with shopping, laptops, phones, delivery and orders 😊";

    // GREETING
    if (
      text === "hi" ||
      text === "hello" ||
      text === "hey"
    ) {

      reply =
        "Hello 👋 Welcome to ShopBot AI. How can I help you today?";

    }

    // BUYING / SUGGESTIONS
    else if (
      text.includes("buy") ||
      text.includes("shop") ||
      text.includes("suggest") ||
      text.includes("recommend") ||
      text.includes("which one should i buy")
    ) {

      reply =
        "Sure 😊 What are you interested in?\n\n• Laptops\n• Phones\n• Gaming Products\n• Smart Watches\n• Headphones\n• Accessories\n\nTell me what you need and your budget.";

    }

    // LAPTOP
    else if (
      text.includes("laptop")
    ) {

      reply =
        "Here are some good laptop options:\n\n• Student Laptop — affordable and good for school work\n• Gaming Laptop — high performance for gaming and editing\n• Business Laptop — fast and perfect for office work\n\nTell me your budget so I can suggest the best one 😊";

    }

    // PHONE
    else if (
      text.includes("phone") ||
      text.includes("iphone") ||
      text.includes("android")
    ) {

      reply =
        "Popular phones available:\n\n• iPhone 15 Pro\n• Samsung Galaxy S24\n• Redmi Note Series\n• Tecno Camon\n\nWhat type do you want?\n1. Budget phone\n2. Camera phone\n3. Gaming phone\n4. Premium phone";

    }

    // GAMING
    else if (
      text.includes("gaming")
    ) {

      reply =
        "We have gaming laptops, PlayStation accessories, gaming keyboards, gaming mice and headsets available 🎮";

    }

    // DELIVERY
    else if (
      text.includes("delivery")
    ) {

      reply =
        "Delivery usually takes 2 to 5 business days depending on your location 🚚";

    }

    // PAYMENT
    else if (
      text.includes("payment") ||
      text.includes("pay")
    ) {

      reply =
        "We accept card payments, bank transfers and online payments securely 💳";

    }

    // ORDER
    else if (
      text.includes("order")
    ) {

      reply =
        "You can place your order directly from the cart page after adding products 🛒";

    }

    // THANK YOU
    else if (
      text.includes("thanks") ||
      text.includes("thank you")
    ) {

      reply =
        "You're welcome 😊 Happy shopping with ShopBot AI.";

    }

    res.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply:
        "⚠️ Server error occurred.",
    });

  }

});

module.exports = router;