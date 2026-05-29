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
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {

      reply =
        "Hello 👋 Welcome to ShopBot AI. What would you like to buy today?";

    }

    // BUYING PRODUCTS
    else if (
      text.includes("buy") ||
      text.includes("shop")
    ) {

      reply =
        "Great 😊 What product are you looking for? We have laptops, phones, gaming products and accessories.";

    }

    // SUGGESTION
    else if (
      text.includes("suggest") ||
      text.includes("recommend")
    ) {

      reply =
        "Sure 😊 You can choose from:\n\n• Laptops\n• Phones\n• Gaming Products\n• Smart Watches\n• Headphones\n• Accessories\n\nTell me what you need.";

    }

    // LAPTOPS
    else if (
      text.includes("laptop")
    ) {

      reply =
        "We have:\n\n• Gaming Laptops\n• Student Laptops\n• Business Laptops\n\nWhich type do you want?";

    }

    // GAMING
    else if (
      text.includes("gaming")
    ) {

      reply =
        "Our gaming products include:\n\n• Gaming Laptops\n• Gaming Keyboards\n• Gaming Mouse\n• Headsets\n• PlayStation Accessories\n\nYou can add any item to your cart and checkout easily 🎮";

    }

    // HOW TO BUY
    else if (
      text.includes("how can i buy") ||
      text.includes("how do i buy") ||
      text.includes("purchase")
    ) {

      reply =
        "To buy a product:\n\n1️⃣ Open the Products page\n2️⃣ Click 'Add To Cart'\n3️⃣ Open your cart\n4️⃣ Click Checkout\n5️⃣ Complete your payment\n\nYour order will be processed immediately 😊";

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
        "We accept card payments and online bank transfers securely 💳";

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