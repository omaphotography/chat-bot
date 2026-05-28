const OpenAI = require("openai");

const supabase =
  require("../config/supabaseClient");

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

// ====================================
// MEMORY STORAGE
// ====================================

const memory = {};

// ====================================
// SAVE MEMORY
// ====================================

const saveMemory = (
  userId,
  role,
  content
) => {

  if (!memory[userId]) {

    memory[userId] = [];

  }

  memory[userId].push({
    role,
    content,
  });

  // LIMIT MEMORY
  if (
    memory[userId].length > 20
  ) {

    memory[userId].shift();

  }

};

// ====================================
// GET MEMORY
// ====================================

const getMemory = (
  userId
) => {

  return memory[userId] || [];

};

// ====================================
// CHECK KEYWORDS
// ====================================

const contains = (
  text,
  keywords
) => {

  return keywords.some(
    (word) =>
      text.includes(word)
  );

};

// ====================================
// DETECT CATEGORY
// ====================================

const detectCategory = (
  message
) => {

  const lower =
    message.toLowerCase();

  if (

    contains(lower, [

      "laptop",
      "macbook",
      "computer",

    ])

  ) {

    return "laptop";

  }

  if (

    contains(lower, [

      "phone",
      "iphone",
      "smartphone",

    ])

  ) {

    return "phone";

  }

  if (

    contains(lower, [

      "gaming",
      "ps5",
      "console",

    ])

  ) {

    return "gaming";

  }

  return null;

};

// ====================================
// SMART PRODUCT SEARCH
// ====================================

const searchProducts = (
  products,
  message
) => {

  const words =
    message
      .toLowerCase()
      .split(" ");

  return products.filter(
    (product) => {

      const text = `
        ${product.title || ""}
        ${product.description || ""}
        ${product.category || ""}
      `.toLowerCase();

      return words.some(
        (word) =>
          text.includes(word)
      );

    }
  );

};

// ====================================
// PRODUCT RECOMMENDATIONS
// ====================================

const recommendProducts = (
  products,
  category
) => {

  return products
    .filter((p) =>

      p.category
        ?.toLowerCase()
        .includes(category)

    )
    .slice(0, 3);

};

// ====================================
// SAVE LEARNING DATA
// ====================================

const saveLearning = async (
  userId,
  userMessage,
  botReply
) => {

  try {

    await supabase
      .from(
        "chatbot_learning"
      )
      .insert([

        {

          user_id: userId,

          user_message:
            userMessage,

          bot_reply:
            botReply,

        },

      ]);

  } catch (error) {

    console.log(
      "LEARNING SAVE ERROR:",
      error.message
    );

  }

};

// ====================================
// OFFLINE SMART AI
// ====================================

const offlineReply =
  async (
    userId,
    message
  ) => {

    const lower =
      message
        .toLowerCase()
        .trim();

    // ====================================
    // GET PRODUCTS
    // ====================================

    const {
      data: products,
    } = await supabase
      .from("products")
      .select("*");

    // ====================================
    // GREETING
    // ====================================

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

I'm your smart ecommerce assistant.

I can help you with:

• product recommendations
• shopping
• order tracking
• delivery
• payments
• refunds
• laptops
• smartphones
• gaming products

What would you like today?
      `;

    }

    // ====================================
    // PHYSICAL STORE
    // ====================================

    if (

      contains(lower, [

        "physical store",
        "store location",
        "shop location",

      ])

    ) {

      return `
🏬 ShopBot currently operates online.

You can shop directly from our website and get products delivered to your location 🚚
      `;

    }

    // ====================================
    // BUSINESS HOURS
    // ====================================

    if (

      contains(lower, [

        "business hours",
        "working hours",
        "open time",

      ])

    ) {

      return `
🕒 Our online store operates 24/7.

Customer support is available daily during support hours.
      `;

    }

    // ====================================
    // SUPPORT
    // ====================================

    if (

      contains(lower, [

        "support",
        "contact",
        "help center",

      ])

    ) {

      return `
📞 You can contact support directly through our live chat anytime.

Our team is always ready to assist you.
      `;

    }

    // ====================================
    // SMART CATEGORY RECOMMENDATION
    // ====================================

    const detectedCategory =
      detectCategory(lower);

    if (
      detectedCategory
    ) {

      const recommendations =
        recommendProducts(
          products,
          detectedCategory
        );

      if (
        recommendations.length > 0
      ) {

        return `
🔥 Recommended ${detectedCategory}s

${recommendations
  .map(
    (p) => `
• ${p.title}
  💰 $${p.price}
`
  )
  .join("\n")}

Visit the Products page to view more details 🛍️
        `;

      }

    }

    // ====================================
    // PRODUCT SEARCH
    // ====================================

    const matchedProducts =
      searchProducts(
        products,
        lower
      );

    if (
      matchedProducts.length > 0
    ) {

      const product =
        matchedProducts[0];

      return `
📦 Product Found

${product.title}

💰 Price:
$${product.price}

📝 ${product.description}

You can add this item directly to your cart 🛒
      `;

    }

    // ====================================
    // PRODUCTS
    // ====================================

    if (

      contains(lower, [

        "products",
        "what do you sell",
        "available products",

      ])

    ) {

      return `
🛍️ We sell:

• laptops
• smartphones
• gaming devices
• headphones
• electronics
• accessories
• smart gadgets

Visit the Products page to explore all products.
      `;

    }

    // ====================================
    // BUYING
    // ====================================

    if (

      contains(lower, [

        "buy",
        "purchase",
        "checkout",
        "place order",

      ])

    ) {

      return `
🛒 To place an order:

1. Browse products
2. Add items to cart
3. Open your cart
4. Proceed to checkout
5. Confirm your order

Your order will immediately appear in your Orders page 📦
      `;

    }

    // ====================================
    // ORDER TRACKING
    // ====================================

    if (

      contains(lower, [

        "track order",
        "where is my order",
        "my order",
        "order status",

      ])

    ) {

      const {
        data: orders,
      } = await supabase
        .from("orders")
        .select("*")
        .eq(
          "user_id",
          userId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (

        !orders ||
        orders.length === 0

      ) {

        return `
📦 You currently have no orders.
        `;

      }

      const latest =
        orders[0];

      return `
📦 Latest Order

🆔 Order ID:
${latest.id}

📌 Status:
${latest.order_status}

💰 Total:
$${latest.total_price}

You can view full details from the Orders page.
      `;

    }

    // ====================================
    // DELIVERY
    // ====================================

    if (

      contains(lower, [

        "delivery",
        "shipping",
        "package",
        "courier",

      ])

    ) {

      return `
🚚 Delivery Information

• Delivery takes 2–5 business days
• Tracking is available
• Shipping updates are provided
• Orders can be monitored from Orders page
      `;

    }

    // ====================================
    // PAYMENT
    // ====================================

    if (

      contains(lower, [

        "payment",
        "pay",
        "card",
        "bank transfer",

      ])

    ) {

      return `
💳 We support secure payment processing.

Available methods may include:
• debit cards
• credit cards
• online payments
• bank transfer

All payment information is encrypted 🔒
      `;

    }

    // ====================================
    // REFUNDS
    // ====================================

    if (

      contains(lower, [

        "refund",
        "return",
        "damaged",
        "wrong item",

      ])

    ) {

      return `
🔄 Refund & Return Policy

• Refunds take 3–7 business days
• Damaged products can be returned
• Wrong items can be exchanged
• Orders may be canceled before shipping
      `;

    }

    // ====================================
    // ACCOUNT
    // ====================================

    if (

      contains(lower, [

        "account",
        "login",
        "register",
        "password",

      ])

    ) {

      return `
👤 Account Assistance

You can:
• create an account
• reset password
• update profile
• manage addresses
• view order history

Use the Login or Register page to continue.
      `;

    }

    // ====================================
    // CART
    // ====================================

    if (

      contains(lower, [

        "cart",
        "basket",
        "add to cart",

      ])

    ) {

      return `
🛒 Your cart stores products before checkout.

From the Cart page you can:
• remove products
• adjust quantity
• proceed to checkout
• view total cost
      `;

    }

    // ====================================
    // DISCOUNTS
    // ====================================

    if (

      contains(lower, [

        "discount",
        "promo",
        "coupon",
        "sale",

      ])

    ) {

      return `
🎉 We regularly offer:

• promo codes
• discounts
• seasonal sales
• bundle deals

Check the homepage for current offers.
      `;

    }

    // ====================================
    // TECHNICAL ISSUES
    // ====================================

    if (

      contains(lower, [

        "bug",
        "error",
        "not working",
        "checkout failed",

      ])

    ) {

      return `
⚠️ Technical Support

Please try:
• refreshing the page
• checking internet connection
• logging in again

If the issue continues,
contact support with details.
      `;

    }

    // ====================================
    // THANK YOU
    // ====================================

    if (

      contains(lower, [

        "thanks",
        "thank you",

      ])

    ) {

      return `
You're welcome 😊

I'm always here to help with your shopping experience.
      `;

    }

    // ====================================
    // DEFAULT
    // ====================================

    return `
I understand 😊

I can help you with:

• products
• shopping
• order tracking
• payments
• delivery
• refunds
• gaming products
• laptops
• smartphones

Please tell me more about what you need.
    `;

  };

// ====================================
// MAIN AI FUNCTION
// ====================================

const generateSmartReply =
  async (
    userId,
    userMessage
  ) => {

    try {

      // SAVE USER MESSAGE
      saveMemory(
        userId,
        "user",
        userMessage
      );

      // ====================================
      // GET PRODUCTS
      // ====================================

      const {
        data: products,
      } = await supabase
        .from("products")
        .select("*");

      // ====================================
      // PRODUCT CONTEXT
      // ====================================

      const productContext =
        products
          ?.slice(0, 30)
          ?.map(
            (p) => `
Title: ${p.title}
Price: $${p.price}
Category: ${p.category}
Description: ${p.description}
          `
          )
          .join("\n");

      // ====================================
      // MEMORY
      // ====================================

      const chatMemory =
        getMemory(userId);

      // ====================================
      // OPENAI RESPONSE
      // ====================================

      const completion =
        await openai.chat.completions.create({

          model:
            "gpt-4.1-mini",

          messages: [

            {
              role: "system",

              content: `
You are ShopBot AI,
an advanced ecommerce assistant.

Your personality:
- smart
- friendly
- conversational
- professional
- human-like

Your responsibilities:
- help users shop
- recommend products
- answer support questions
- explain delivery
- assist with payments
- help with refunds
- guide customers naturally

Rules:
- never sound robotic
- keep replies concise
- recommend products naturally
- personalize responses
- use emojis moderately
- prioritize customer satisfaction

Available products:
${productContext}
              `,
            },

            ...chatMemory,

            {
              role: "user",
              content:
                userMessage,
            },

          ],

          temperature: 0.7,

          max_tokens: 300,

        });

      const reply =
        completion
          .choices[0]
          .message.content;

      // SAVE ASSISTANT MEMORY
      saveMemory(
        userId,
        "assistant",
        reply
      );

      // SAVE LEARNING
      await saveLearning(
        userId,
        userMessage,
        reply
      );

      return reply;

    } catch (error) {

      console.log(
        "OPENAI FAILED:",
        error.message
      );

      // FALLBACK AI
      return await offlineReply(
        userId,
        userMessage
      );

    }

  };

module.exports =
  generateSmartReply;