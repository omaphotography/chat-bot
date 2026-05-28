const supabase =
  require("../config/supabaseClient");

const generateAIResponse =
  require("../chatbot/smartBot");

const sendMessage = async (
  req,
  res
) => {

  try {

    const {
      message,
      userId,
    } = req.body;

    // VALIDATION
    if (!message) {

      return res.status(400).json({

        reply:
          "Please enter a message.",

      });

    }

    // GET FAQS
    const {
      data: faqs,
      error: faqError,
    } = await supabase
      .from("chatbot_faqs")
      .select("*");

    if (faqError) {

      console.log(
        faqError.message
      );

    }

    let botReply = "";

    // LOWERCASE MESSAGE
    const lowerMessage =
      message.toLowerCase();

    // FIND FAQ MATCH
    const matchedFAQ =
      faqs?.find((faq) =>

        lowerMessage.includes(
          faq.keyword.toLowerCase()
        )

      );

    // FAQ RESPONSE
    if (matchedFAQ) {

      botReply =
        matchedFAQ.answer;

    }

    // SMART AI RESPONSE
    else {

      botReply =
        await generateAIResponse(

          userId || "guest",

          message

        );

    }

    // RESPONSE
    res.status(200).json({

      success: true,

      reply: botReply,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      reply:
        "ShopBot AI is temporarily unavailable. Please try again later.",

    });

  }

};

module.exports = {

  sendMessage,

};