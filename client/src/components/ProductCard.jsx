import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } =
    useContext(CartContext);

  return (

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      shadow-2xl
      hover:shadow-purple-500/30
      transition-all
      duration-500
      hover:-translate-y-3
    "
    >

      {/* TOP GRADIENT */}
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-blue-500/10
        via-purple-500/10
        to-pink-500/10
        opacity-0
        group-hover:opacity-100
        transition
        duration-500
      "
      />

      {/* IMAGE */}
      <div className="overflow-hidden relative">

        <img
          src={product.image}
          alt={product.title}
          className="
          w-full
          h-72
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
        />

        {/* CATEGORY BADGE */}
        <div
          className="
          absolute
          top-4
          left-4
          bg-black/70
          backdrop-blur-lg
          text-white
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          border
          border-white/10
        "
        >

          {product.category || "Tech"}

        </div>

      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-6">

        <h2
          className="
          text-2xl
          font-extrabold
          text-white
          line-clamp-1
        "
        >

          {product.title}

        </h2>

        <p
          className="
          text-gray-300
          mt-3
          leading-relaxed
          line-clamp-3
          min-h-[80px]
        "
        >

          {product.description}

        </p>

        {/* PRICE + BUTTON */}
        <div
          className="
          flex
          items-center
          justify-between
          mt-6
          gap-4
        "
        >

          <div>

            <p className="text-sm text-gray-400">
              Price
            </p>

            <h3
              className="
              text-3xl
              font-extrabold
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
            "
            >

              ${product.price}

            </h3>

          </div>

          <button
            onClick={() =>
              addToCart(product)
            }
            className="
            px-6
            py-3
            rounded-2xl
            font-bold
            text-white
            bg-gradient-to-r
            from-blue-500
            via-purple-500
            to-pink-500
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            shadow-lg
            hover:shadow-purple-500/40
          "
          >

            Add To Cart

          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;