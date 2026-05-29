import { useEffect, useRef, useState } from "react";

import axios from "axios";

function ChatWidget() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hello 👋 Welcome to ShopBot AI.",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.
      scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  // SEND MESSAGE
  const sendMessage =
    async () => {

      if (!message.trim())
        return;

      const userMessage = {
        sender: "user",
        text: message,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      const currentMessage =
        message;

      setMessage("");

      try {

        setLoading(true);

        const response =
          await axios.post(
          "https://chat-bot-tiy2.onrender.com/api/chat",
            {
              message:
                currentMessage,
            }
          );

        const botMessage = {
          sender: "bot",
          text:
            response.data.reply,
        };

        setMessages((prev) => [
          ...prev,
          botMessage,
        ]);

      } catch (error) {

        console.log(error);

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "⚠️ Server error occurred.",
          },
        ]);

      } finally {

        setLoading(false);

      }

    };

  return (

    <>

      {/* FLOATING BUTTON */}
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="
        fixed
        bottom-6
        right-6
        z-[9999]
        w-20
        h-20
        rounded-full
        bg-gradient-to-r
        from-blue-600
        via-purple-600
        to-pink-600
        text-white
        text-2xl
        font-bold
        shadow-[0_0_30px_rgba(168,85,247,0.7)]
        hover:scale-110
        transition-all
        duration-300
        flex
        items-center
        justify-center
      "
      >

        {isOpen ? "✕" : "🤖"}

      </button>

      {/* CHAT BOX */}
      {isOpen && (

        <div
          className="
          fixed
          bottom-28
          right-6
          z-[9999]
          w-[380px]
          max-w-[95vw]
          h-[650px]
          rounded-3xl
          overflow-hidden
          shadow-[0_0_50px_rgba(0,0,0,0.4)]
          border
          border-white/20
          backdrop-blur-xl
          bg-white
          flex
          flex-col
        "
        >

          {/* HEADER */}
          <div
            className="
            bg-gradient-to-r
            from-blue-600
            via-purple-600
            to-pink-600
            p-5
            text-white
          "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                w-12
                h-12
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
                text-2xl
              "
              >
                🤖
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  ShopBot AI
                </h2>

                <p className="text-sm text-white/80">
                  Smart Shopping Assistant
                </p>

              </div>

            </div>

          </div>

          {/* MESSAGES */}
          <div
            className="
            flex-1
            overflow-y-auto
            p-5
            space-y-4
            bg-gradient-to-b
            from-gray-100
            to-white
          "
          >

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                    max-w-[80%]
                    px-5
                    py-4
                    rounded-3xl
                    text-sm
                    leading-relaxed
                    shadow-md
                    ${
                      msg.sender ===
                      "user"
                        ? `
                          bg-gradient-to-r
                          from-blue-600
                          to-purple-600
                          text-white
                        `
                        : `
                          bg-white
                          text-gray-800
                        `
                    }
                  `}
                  >

                    {msg.text}

                  </div>

                </div>

              )
            )}

            {/* LOADING */}
            {loading && (

              <div className="flex justify-start">

                <div
                  className="
                  bg-white
                  px-5
                  py-4
                  rounded-3xl
                  shadow-md
                  text-gray-600
                "
                >
                  Typing...
                </div>

              </div>

            )}

            <div
              ref={messagesEndRef}
            />

          </div>

          {/* INPUT */}
          <div
            className="
            p-4
            bg-white
            border-t
            flex
            items-center
            gap-3
          "
          >

            <input
              type="text"
              placeholder="Ask ShopBot AI anything..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  sendMessage();

                }

              }}
              className="
              flex-1
              bg-gray-100
              rounded-2xl
              px-5
              py-4
              outline-none
              border-2
              border-transparent
              focus:border-purple-500
              transition
            "
            />

            <button
              onClick={sendMessage}
              className="
              px-6
              py-4
              rounded-2xl
              text-white
              font-bold
              bg-gradient-to-r
              from-blue-600
              via-purple-600
              to-pink-600
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
            "
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>

  );

}

export default ChatWidget;