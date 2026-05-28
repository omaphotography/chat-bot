import {
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  CartContext,
} from "../context/CartContext";

function Cart() {

  const navigate =
    useNavigate();

  const {

    cartItems,

    removeFromCart,

  } = useContext(
    CartContext
  );

  // TOTAL PRICE
  const total =
    cartItems.reduce(

      (acc, item) =>

        acc +
        item.price *
          item.quantity,

      0

    );

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 px-6 py-10 overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-14"
        >

          <div className="inline-block bg-white/10 border border-white/20 backdrop-blur-xl px-6 py-2 rounded-full mb-6">

            <p className="text-cyan-300 font-semibold">

              🛒 Your Shopping Cart

            </p>

          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">

            Review Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

              Selected Products

            </span>

          </h1>

        </motion.div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-16 text-center shadow-2xl"
          >

            <div className="text-8xl mb-6">
              🛍️
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">

              Your Cart Is Empty

            </h2>

            <p className="text-gray-300 text-xl mb-10">

              Add amazing products to your cart
              and start shopping.

            </p>

            <button
              onClick={() =>
                navigate("/store")
              }
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
            >

              Continue Shopping

            </button>

          </motion.div>

        ) : (

          <div className="space-y-8">

            {/* PRODUCTS */}
            {cartItems.map(
              (item, index) => (

                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl"
                >

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                    {/* PRODUCT INFO */}
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full">

                      <div className="relative">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-36 h-36 object-cover rounded-3xl shadow-xl border border-white/10"
                        />

                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/10 to-purple-500/10"></div>

                      </div>

                      <div className="text-center md:text-left">

                        <h2 className="text-3xl font-bold text-white mb-3">

                          {item.title}

                        </h2>

                        <div className="flex flex-wrap items-center gap-4 mb-4">

                          <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </span>

                          <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">

                            Premium Product

                          </span>

                        </div>

                        <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                          $
                          {item.price *
                            item.quantity}

                        </p>

                      </div>

                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 hover:shadow-red-500/30 transition-all duration-300"
                    >

                      Remove

                    </button>

                  </div>

                </motion.div>

              )
            )}

            {/* TOTAL SECTION */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl"
            >

              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* LEFT */}
                <div>

                  <p className="text-cyan-300 text-lg font-semibold mb-3">

                    💳 Total Payment

                  </p>

                  <h2 className="text-5xl md:text-6xl font-extrabold text-white">

                    $
                    {total.toFixed(
                      2
                    )}

                  </h2>

                  <p className="text-gray-300 mt-4 text-lg">

                    Secure checkout with fast delivery 🚚

                  </p>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate(
                      "/checkout"
                    )
                  }
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:scale-105 hover:shadow-cyan-500/30 transition-all duration-300"
                >

                  Proceed To Checkout →

                </button>

              </div>

            </motion.div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cart;