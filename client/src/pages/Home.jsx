import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import ProductCard from "../components/ProductCard";

import API from "../services/api";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const response =
            await API.get(
              "/products"
            );

          setProducts(
            response.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchProducts();

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* HERO */}
      <div className="relative z-10 px-6 md:px-12 pt-20 pb-10">

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
            duration: 0.8,
          }}
          className="text-center max-w-5xl mx-auto"
        >

          <div className="inline-block bg-white/10 border border-white/20 backdrop-blur-lg px-6 py-2 rounded-full mb-8">

            <p className="text-blue-300 font-semibold tracking-wide">

              ✨ AI Powered Ecommerce Store

            </p>

          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">

            Discover Amazing
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

              Tech Products

            </span>

          </h1>

          <p className="text-gray-300 text-lg md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed">

            Explore premium gadgets, smart devices,
            gaming gear, laptops, and AI-powered
            shopping experiences designed for the future.

          </p>

        </motion.div>

      </div>

      {/* PRODUCTS SECTION */}
      <div className="relative z-10 px-6 md:px-12 pb-20">

        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">

          <div>

            <h2 className="text-4xl font-bold text-white mb-3">

              Featured Products

            </h2>

            <p className="text-gray-400 text-lg">

              Browse our latest premium collection

            </p>

          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg px-6 py-3 rounded-2xl">

            <p className="text-white font-semibold">

              {products.length}
              {" "}
              Products Available

            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center py-32">

            <div className="flex flex-col items-center">

              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-white text-xl mt-6 font-semibold">

                Loading Products...

              </p>

            </div>

          </div>

        ) : products.length === 0 ? (

          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-16 text-center">

            <h2 className="text-4xl font-bold text-white mb-4">

              No Products Found

            </h2>

            <p className="text-gray-300 text-lg">

              Products will appear here soon.

            </p>

          </div>

        ) : (

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >

            {products.map(
              (product) => (

                <motion.div
                  key={product.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 40,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.0,
                  }}
                  className="transition-all duration-300"
                >

                  <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/20">

                    <ProductCard
                      product={product}
                    />

                  </div>

                </motion.div>

              )
            )}

          </motion.div>

        )}

      </div>

    </div>

  );

}

export default Home;