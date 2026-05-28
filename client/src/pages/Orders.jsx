import {
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  AuthContext,
} from "../context/AuthContext";

function Orders() {

  const { user } =
    useContext(
      AuthContext
    );

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS
  const fetchOrders =
    async () => {

      try {

        const response =
          await API.get(
            `/orders/user/${user.id}`
          );

        setOrders(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (user?.id) {

      fetchOrders();

    }

  }, [user]);

  // STATUS COLORS
  const getStatusColor =
    (status) => {

      switch (status) {

        case "Processing":
          return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

        case "Shipped":
          return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

        case "Out For Delivery":
          return "bg-purple-500/20 text-purple-300 border border-purple-500/30";

        case "Delivered":
          return "bg-green-500/20 text-green-300 border border-green-500/30";

        case "Cancelled":
          return "bg-red-500/20 text-red-300 border border-red-500/30";

        default:
          return "bg-gray-500/20 text-gray-300 border border-gray-500/30";

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10 relative overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-14">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">

            My Orders 📦

          </h1>

          <p className="text-gray-300 text-lg">

            Track purchases, monitor deliveries,
            and manage your shopping history.

          </p>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center">

            <h2 className="text-3xl font-bold text-white">

              Loading orders...

            </h2>

          </div>

        ) : orders.length === 0 ? (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center">

            <h2 className="text-4xl font-bold text-white mb-4">

              No Orders Yet

            </h2>

            <p className="text-gray-300">

              Your purchases will appear here.

            </p>

          </div>

        ) : (

          <div className="space-y-10">

            {orders.map(
              (order) => (

                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >

                  {/* TOP */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">

                    <div>

                      <h2 className="text-3xl font-extrabold text-white">

                        Order #{order.id}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        Tracking:
                        {" "}
                        {order.tracking_number}

                      </p>

                    </div>

                    <span
                      className={`px-6 py-3 rounded-full font-semibold text-sm ${getStatusColor(order.order_status)}`}
                    >

                      {order.order_status}

                    </span>

                  </div>

                  {/* PRODUCTS */}
                  <div className="space-y-6">

                    {order.products.map(
                      (
                        product,
                        index
                      ) => (

                        <div
                          key={index}
                          className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6"
                        >

                          <div className="flex items-center gap-5">

                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.title
                              }
                              className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                            />

                            <div>

                              <h3 className="text-2xl font-bold text-white">

                                {
                                  product.title
                                }

                              </h3>

                              <p className="text-gray-400 mt-2">

                                Quantity:
                                {" "}
                                {
                                  product.quantity
                                }

                              </p>

                            </div>

                          </div>

                          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">

                            $
                            {
                              product.price *
                              product.quantity
                            }

                          </h2>

                        </div>

                      )
                    )}

                  </div>

                  {/* DELIVERY INFO */}
                  <div className="bg-black/30 border border-white/10 rounded-3xl p-6 mt-10">

                    <h3 className="text-2xl font-bold text-white mb-5">

                      Delivery Information 🚚

                    </h3>

                    <div className="space-y-3 text-gray-300">

                      <p>

                        Estimated Delivery:
                        {" "}
                        {
                          order.estimated_delivery
                        }

                      </p>

                      <p>

                        Current Status:
                        {" "}
                        {
                          order.order_status
                        }

                      </p>

                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10">

                    {/* CANCEL BUTTON */}
                    {order.order_status !==
                      "Cancelled" &&

                      order.order_status !==
                        "Delivered" && (

                        <button
                          onClick={() =>
                            cancelOrder(
                              order.id
                            )
                          }
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl"
                        >

                          Cancel Order

                        </button>

                      )}

                    {/* TOTAL */}
                    <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">

                      $
                      {
                        order.total_price
                      }

                    </h2>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Orders;