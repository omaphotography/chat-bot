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

    // BUY
    else if (
      text.includes("buy") ||
      text.includes("shop")
    ) {

      reply =
        "Great 😊 What product are you looking for?";

    }

    // SUGGEST
    else if (
      text.includes("suggest") ||
      text.includes("recommend")
    ) {

      reply =
        "Sure 😊 We have:\n\n• Laptops\n• Phones\n• Gaming Products\n• Accessories";

    }

    // GAMING LAPTOPS
    else if (
      text.includes("gaming laptop") ||
      text.includes("gaming")
    ) {

      reply =
        "🔥 Gaming Laptop Recommendations:\n\n• ASUS ROG\n• Alienware\n• HP Omen\n• Lenovo Legion\n\nPrice starts from $900. Would you like budget or premium options?";

    }
    // premium
    else if (
      text.includes("premium laptop") ||
      text.includes("premium")
    ) {

      reply =
        "💎 Premium Laptop Recommendations:\n\n• MacBook Pro\n• Dell XPS\n• Lenovo ThinkPad\n\nSleek design and powerful performance.";

    }
    // budget
    else if (
      text.includes("budget laptop") ||
      text.includes("budget")
    ) {

      reply =
        "� Budget Laptop Recommendations:\n\n• HP Pavilion\n• Lenovo IdeaPad\n• Dell Inspiron\n\nAffordable and perfect for school work.";
    }

// get
    else if (
      text.includes("how can i buy it") ||
      text.includes("get it")
      
    ) {

      reply =
        "🛒 To buy:\n\n1️⃣ Add product to cart\n2️⃣ Open cart\n3️⃣ Click checkout\n4️⃣ wait for delivery";
    }
    // STUDENT LAPTOP
    else if (
      text.includes("student laptop")
    ) {

      reply =
        "🎓 Student Laptop Options:\n\n• HP Pavilion\n• Lenovo IdeaPad\n• Dell Inspiron\n\nAffordable and perfect for school work.";

    }

    // BUSINESS LAPTOP
    else if (
      text.includes("business laptop")
    ) {

      reply =
        "💼 Business Laptop Options:\n\n• MacBook Pro\n• Dell XPS\n• Lenovo ThinkPad\n\nFast and reliable for office work.";

    }

    // LAPTOP
    else if (
      text.includes("laptop")
    ) {

      reply =
        "We have:\n\n• Gaming Laptops\n• Student Laptops\n• Business Laptops\n\nWhich type do you want?";

    }

    // PHONES
    else if (
      text.includes("phone") ||
      text.includes("iphone") ||
      text.includes("android")
    ) {

      reply =
        "📱 Available Phones:\n\n• iPhone\n• Samsung Galaxy\n• Tecno\n• Infinix\n• Redmi";

    }

    // DELIVERY
    else if (
      text.includes("delivery")
    ) {

      reply =
        "🚚 Delivery takes 2 to 5 business days.";

    }

    // PAYMENT
    else if (
      text.includes("payment") ||
      text.includes("pay")
    ) {

      reply =
        "💳 We accept cards and bank transfers.";

    }

    // HOW TO BUY
    else if (
      text.includes("how can i buy") ||
      text.includes("checkout")
    ) {

      reply =
        "🛒 To buy:\n\n1️⃣ Add product to cart\n2️⃣ Open cart\n3️⃣ Click checkout\n4️⃣ Complete payment";

    }

    // THANK YOU
    else if (
      text.includes("thank")
    ) {

      reply =
        "You're welcome 😊";

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