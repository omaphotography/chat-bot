const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase =
  require("../config/supabaseClient");

// ===============================
// MEMORY STORAGE
// ===============================
const memory = {};

// SAVE MEMORY
const saveMemory = (
  userId,
  role,
  message
) => {

  if (!memory[userId]) {

    memory[userId] = [];

  }

  memory[userId].push({
    role,
    content: message,
  });

  // KEEP LAST 15 CHATS
  if (
    memory[userId].length > 15
  ) {

    memory[userId].shift();

  }

};

// GET MEMORY
const getMemory = (
  userId
) => {

  return memory[userId] || [];

};

// ===============================
// KEYWORD MATCHER
// ===============================
const contains = (
  text,
  keywords
) => {

  return keywords.some(
    (word) =>
      text.includes(word)
  );

};

// ===============================
// FIND PRODUCT
// ===============================
const findMatchingProduct = (
  products,
  message
) => {

  const lower =
    message.toLowerCase();

  return products.find((p) => {

    return (
      lower.includes(
        p.title.toLowerCase()
      ) ||

      lower.includes(
        p.category?.toLowerCase()
      )
    );

  });

};

// ===============================
// OFFLINE SMART AI
// ===============================
const getOfflineReply =
  async (
    userId,
    message
  ) => {

    const lower =
      message.toLowerCase();

    saveMemory(
      userId,
      "user",
      message
    );

    // FETCH PRODUCTS
    const {
      data: products,
    } = await supabase
      .from("products")
      .select("*");

    // ===========================
    // GREETINGS
    // ===========================
    if (

      contains(lower, [

        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",

      ])

    ) {

      return `
Hello 👋 Welcome to ShopBot AI.

I can help you with:

• product recommendations
• shopping
• delivery
• orders
• refunds
• gaming devices
• laptops
• smartphones

What would you like to buy today?
      `;

    }

    // ===========================
    // PHYSICAL STORE
    // ===========================
    if (

      contains(lower, [

        "physical store",
        "store location",
        "offline store",
        "shop location",

      ])

    ) {

      return `
Currently, ShopBot mainly operates online 🌍

You can order products directly from our website anytime and get them delivered to your location.
      `;

    }

    // ===========================
    // HOW TO BUY
    // ===========================
    if (

      contains(lower, [

        "how can i buy",
        "how do i buy",
        "purchase",
        "buy product",
        "how can i order",

      ])

    ) {

      return `
🛒 Buying products is simple:

1. Open the Products page
2. Select any product
3. Click Add To Cart
4. Open your cart
5. Proceed to Checkout
6. Place your order

Your order will instantly appear inside your Orders page.
      `;

    }

    // ===========================
    // DELIVERY
    // ===========================
    if (

      contains(lower, [

        "delivery",
        "shipping",
        "receive my goods",
        "how will i get",
        "track order",
        "where is my order",

      ])

    ) {

      return `
🚚 After placing your order:

• your order is processed
• packaged securely
• shipped to your address

Delivery usually takes 2 to 5 business days depending on your location.

You can track everything from the Orders page 📦
      `;

    }

    // ===========================
    // PAYMENT
    // ===========================
    if (

      contains(lower, [

        "payment",
        "pay",
        "card",
        "bank transfer",
        "debit card",

      ])

    ) {

      return `
💳 We support secure checkout and payment processing.

Payment integrations can include:

• Debit cards
• Credit cards
• Bank transfer
• Paystack
• Flutterwave

Your transactions are processed securely.
      `;

    }

    // ===========================
    // REFUNDS
    // ===========================
    if (

      contains(lower, [

        "refund",
        "return",
        "exchange",
        "damaged item",

      ])

    ) {

      return `
🔄 Refunds are processed within 3 to 7 business days after approval.

You can also:

• return damaged items
• exchange products
• cancel active orders
      `;

    }

    // ===========================
    // PRODUCTS
    // ===========================
    if (

      contains(lower, [

        "what products",
        "what do you sell",
        "available products",
        "products",

      ])

    ) {

      return `
🛍️ We sell products including:

• laptops
• phones
• gaming consoles
• smart gadgets
• headphones
• accessories
• electronics

Visit the Products page to explore available items.
      `;

    }

    // ===========================
    // PRODUCT RECOMMENDATIONS
    // ===========================
    if (

      contains(lower, [

        "recommend",
        "best",
        "suggest",

      ])

    ) {

      // LAPTOPS
      if (
        contains(lower, [
          "laptop",
          "macbook",
        ])
      ) {

        return `
💻 Recommended laptops:

• MacBook Pro M3
• Dell XPS
• ASUS ROG
• HP Pavilion

What will you use the laptop for?

• gaming
• programming
• design
• office work
        `;

      }

      // PHONES
      if (
        contains(lower, [
          "phone",
          "iphone",
          "smartphone",
        ])
      ) {

        return `
📱 Recommended smartphones:

• iPhone 15 Pro Max
• Samsung Galaxy S25 Ultra
• Google Pixel
• Redmi Note Series

Do you want:

• gaming performance
• camera quality
• battery life
• affordable pricing
        `;

      }

      // GAMING
      if (
        contains(lower, [
          "gaming",
          "ps5",
          "console",
        ])
      ) {

        return `
🎮 Gaming recommendations:

• PlayStation 5
• ASUS ROG Gaming Laptop
• Gaming Headsets
• Gaming Controllers

Would you like console or PC gaming recommendations?
        `;

      }

    }

    // ===========================
    // PRODUCT SEARCH
    // ===========================
    const matchedProduct =
      findMatchingProduct(
        products,
        lower
      );

    if (matchedProduct) {

      return `
📦 Product Found:

${matchedProduct.title}

💰 Price: $${matchedProduct.price}

📝 ${matchedProduct.description}

You can add this item directly to your cart from the Products page.
      `;

    }

    // ===========================
    // ORDERS
    // ===========================
    if (

      contains(lower, [

        "orders",
        "order history",
        "my orders",

      ])

    ) {

      return `
📦 You can view all your orders from the Orders page.

There you can:

• track delivery
• cancel orders
• view order history
• monitor order status
      `;

    }

    // ===========================
    // THANKS
    // ===========================
    if (

      contains(lower, [

        "thanks",
        "thank you",

      ])

    ) {

      return `
You're welcome 😊

Let me know if you need help with anything else.
      `;

    }

    // ===========================
    // DEFAULT RESPONSE
    // ===========================
    return `
I understand 😊

Could you explain a little more so I can help you better?

You can ask me about:

• products
• shopping
• laptops
• gaming
• delivery
• orders
• refunds
• payments
    `;

  };

// ===============================
// MAIN AI FUNCTION
// ===============================
const generateAIResponse =
  async (
    userId,
    userMessage
  ) => {

    try {

      // FETCH PRODUCTS
      const {
        data: products,
      } = await supabase
        .from("products")
        .select("*");

      // PRODUCT CONTEXT
      const productContext =
        products
          ?.slice(0, 20)
          ?.map(
            (p) =>
              `${p.title} - $${p.price}`
          )
          .join("\n");

      // MEMORY
      const previousChats =
        getMemory(userId);

      const messages = [

        {
          role: "system",
          content: `
You are ShopBot AI.

You are a smart ecommerce assistant.

Your job:
- help customers shop
- recommend products
- answer customer care questions
- explain delivery
- explain refunds
- explain orders
- answer naturally like a human
- be conversational
- be intelligent
- be concise
- sound modern and professional

Available products:
${productContext}
          `,
        },

        ...previousChats,

        {
          role: "user",
          content: userMessage,
        },

      ];

      const completion =
        await openai.chat.completions.create({

          model: "gpt-4.1-mini",

          messages,

          temperature: 0.7,

          max_tokens: 300,

        });

      const reply =
        completion.choices[0]
          .message.content;

      // SAVE MEMORY
      saveMemory(
        userId,
        "user",
        userMessage
      );

      saveMemory(
        userId,
        "assistant",
        reply
      );

      return reply;

    } catch (error) {

      console.log(
        "OPENAI FAILED:",
        error.message
      );

      return await getOfflineReply(
        userId,
        userMessage
      );

    }

  };

module.exports =
  generateAIResponse;