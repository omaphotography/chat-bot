import {
  useContext,
  useState,
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

import {
  AuthContext,
} from "../context/AuthContext";

import API from "../services/api";

function Checkout() {

  const navigate =
    useNavigate();

  const {

    cartItems,

    clearCart,

  } = useContext(
    CartContext
  );

  const { user } =
    useContext(
      AuthContext
    );

  const [loading, setLoading] =
    useState(false);

  // TOTAL PRICE
  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price *
          item.quantity,

      0

    );

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        setLoading(true);

        const orderData = {

          user_id:
            user.id,

          customer_name:
            user.name,

          customer_email:
            user.email,

          products:
            cartItems,

          total_price:
            totalPrice,

          order_status:
            "Processing",

          tracking_number:
            `TRK-${Date.now()}`,

          estimated_delivery:
            "2 - 5 Business Days",

        };

        const response =
          await API.post(
            "/orders",
            orderData
          );

        alert(
          response.data.message
        );

        clearCart();

        navigate(
          "/orders"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to place order"
        );

      } finally {

        setLoading(false);

      }

    };

  // EMPTY CART
  if (
    cartItems.length === 0
  ) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl text-center max-w-xl"
        >

          <div className="text-8xl mb-6">
            🛒
          </div>

          <h1 className="text-5xl font-extrabold text-white mb-5">

            Your Cart Is Empty

          </h1>

          <p className="text-gray-300 text-lg mb-10">

            Add products before proceeding
            to checkout.

          </p>

          <button
            onClick={() =>
              navigate(
                "/store"
              )
            }
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl"
          >

            Continue Shopping

          </button>

        </motion.div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 py-16 px-6 relative overflow-hidden">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] shadow-2xl overflow-hidden"
        >

          {/* HEADER */}
          <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-10">

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

              <div>

                <p className="text-cyan-100 font-semibold mb-3">

                  ⚡ Secure Checkout

                </p>

                <h1 className="text-5xl md:text-6xl font-extrabold text-white">

                  Complete
                  Your Order

                </h1>

              </div>

              <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl backdrop-blur-xl">

                <p className="text-white text-sm">

                  Estimated Delivery

                </p>

                <h2 className="text-2xl font-bold text-cyan-200">

                  2 - 5 Days 🚚

                </h2>

              </div>

            </div>

          </div>

          <div className="p-8 md:p-12">

            {/* PRODUCTS */}
            <div className="space-y-6">

              {cartItems.map(
                (
                  item,
                  index
                ) => (

                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.1,
                    }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all duration-300"
                  >

                    <div className="flex flex-col md:flex-row items-center gap-6">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-32 h-32 object-cover rounded-3xl border border-white/10 shadow-xl"
                      />

                      <div className="text-center md:text-left">

                        <h2 className="text-3xl font-bold text-white mb-3">

                          {item.title}

                        </h2>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">

                          <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </span>

                          <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">

                            Premium Tech

                          </span>

                        </div>

                        <p className="text-cyan-400 text-2xl font-extrabold mt-4">

                          $
                          {item.price}

                        </p>

                      </div>

                    </div>

                    <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                      $
                      {item.price *
                        item.quantity}

                    </div>

                  </motion.div>

                )
              )}

            </div>

            {/* DELIVERY INFO */}
            <div className="grid lg:grid-cols-2 gap-8 mt-12">

              {/* CUSTOMER INFO */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <h2 className="text-3xl font-bold text-white mb-6">

                  👤 Customer Information

                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-gray-400 mb-1">

                      Full Name

                    </p>

                    <h3 className="text-xl font-semibold text-white">

                      {user?.name}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-1">

                      Email Address

                    </p>

                    <h3 className="text-xl font-semibold text-white">

                      {user?.email}

                    </h3>

                  </div>

                </div>

              </div>

              {/* DELIVERY */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8">

                <h2 className="text-3xl font-bold text-white mb-6">

                  🚚 Delivery Details

                </h2>

                <div className="space-y-5">

                  <div className="flex items-center justify-between">

                    <span className="text-gray-300">

                      Delivery Time

                    </span>

                    <span className="text-cyan-300 font-bold">

                      2 - 5 Days

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-gray-300">

                      Order Status

                    </span>

                    <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">

                      Processing

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-gray-300">

                      Shipping

                    </span>

                    <span className="text-green-400 font-bold">

                      Free

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* TOTAL */}
            <div className="mt-14 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-8">

              <div>

                <p className="text-cyan-300 font-semibold mb-3">

                  💳 Total Payment

                </p>

                <h2 className="text-6xl font-extrabold text-white">

                  $
                  {totalPrice.toFixed(
                    2
                  )}

                </h2>

                <p className="text-gray-300 mt-3">

                  Taxes & shipping included.

                </p>

              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-14 py-5 rounded-3xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50"
              >

                {loading
                  ? "Processing..."
                  : "Place Order 🚀"}

              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

}

export default Checkout;