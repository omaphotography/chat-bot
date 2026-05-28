import {
  useEffect,
  useState,
} from "react";

import ProductCard from "../components/ProductCard";

import API from "../services/api";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH PRODUCTS
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

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-900
      to-black
      text-white
      px-6
      md:px-10
      py-12
      relative
      overflow-hidden
    "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        top-0
        left-0
        w-96
        h-96
        bg-blue-500/20
        blur-3xl
        rounded-full
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-96
        h-96
        bg-purple-500/20
        blur-3xl
        rounded-full
      "
      />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">

          <h1
            className="
            text-5xl
            md:text-7xl
            font-extrabold
            mb-6
            bg-gradient-to-r
            from-blue-400
            via-purple-400
            to-pink-500
            bg-clip-text
            text-transparent
          "
          >

            Explore Products

          </h1>

          <p
            className="
            text-gray-300
            text-lg
            md:text-xl
            max-w-3xl
            mx-auto
            leading-relaxed
          "
          >

            Discover premium gadgets,
            smart devices, gaming accessories,
            and futuristic technology powered
            by ShopBot AI.

          </p>

        </div>

        {/* STATS */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-14
        "
        >

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            border
            border-white/10
            rounded-3xl
            p-6
            text-center
          "
          >

            <h2 className="text-4xl font-extrabold text-blue-400">

              {products.length}

            </h2>

            <p className="text-gray-300 mt-2">

              Available Products

            </p>

          </div>

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            border
            border-white/10
            rounded-3xl
            p-6
            text-center
          "
          >

            <h2 className="text-4xl font-extrabold text-purple-400">

              AI

            </h2>

            <p className="text-gray-300 mt-2">

              Smart Recommendations

            </p>

          </div>

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            border
            border-white/10
            rounded-3xl
            p-6
            text-center
          "
          >

            <h2 className="text-4xl font-extrabold text-pink-400">

              24/7

            </h2>

            <p className="text-gray-300 mt-2">

              Online Shopping

            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center py-32">

            <div
              className="
              w-20
              h-20
              border-4
              border-blue-500
              border-t-transparent
              rounded-full
              animate-spin
            "
            />

          </div>

        ) : (

          <>
            {/* PRODUCTS GRID */}
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-10
            "
            >

              {products.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}

            </div>

            {/* EMPTY PRODUCTS */}
            {products.length === 0 && (

              <div
                className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/10
                rounded-3xl
                p-12
                text-center
                mt-10
              "
              >

                <h2 className="text-3xl font-bold mb-4">

                  No Products Found

                </h2>

                <p className="text-gray-300">

                  Products will appear here once
                  added to your store.

                </p>

              </div>

            )}
          </>

        )}

      </div>

    </div>

  );

}

export default Products;