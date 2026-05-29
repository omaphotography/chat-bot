const express = require("express");

const router = express.Router();

const OpenAI =
  require("openai");

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

router.post(
  "/",
  async (req, res) => {

    try {

      const { message } =
        req.body;

      const completion =
        await openai.chat.completions.create({

          model:
            "gpt-3.5-turbo",

          messages: [

            {
              role: "system",

              content:
                `
You are ShopBot AI.

You are a smart ecommerce assistant.

Help users with:
- product recommendations
- shopping advice
- laptops
- phones
- gaming
- orders
- delivery
- payments
- refunds

Keep responses short, friendly, and human.
`,
            },

            {
              role: "user",

              content:
                message,
            },

          ],

        });

      const reply =
        completion.choices[0]
          .message.content;

      res.json({
        reply,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        reply:
          "⚠️ AI server error.",
      });

    }

  }
);

module.exports =
  router;