function Footer() {

  return (

    <footer
      className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-black
      via-gray-900
      to-black
      border-t
      border-white/10
      mt-20
    "
    >

      {/* GLOW EFFECTS */}
      <div
        className="
        absolute
        top-0
        left-0
        w-72
        h-72
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
        w-72
        h-72
        bg-purple-500/20
        blur-3xl
        rounded-full
      "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        md:px-10
        py-14
      "
      >

        {/* TOP */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-10
          border-b
          border-white/10
          pb-10
        "
        >

          {/* LOGO */}
          <div>

            <h1
              className="
              text-4xl
              font-extrabold
              bg-gradient-to-r
              from-blue-400
              via-purple-400
              to-pink-500
              bg-clip-text
              text-transparent
            "
            >

              ShopBot AI

            </h1>

            <p
              className="
              text-gray-400
              mt-4
              max-w-md
              leading-relaxed
            "
            >

              Smart ecommerce powered by AI.
              Shop premium gadgets, electronics,
              gaming devices, and future-ready tech
              products with an amazing experience.

            </p>

          </div>

          {/* LINKS */}
          <div
            className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-6
            text-gray-300
            font-medium
          "
          >

            <a
              href="/store"
              className="
              hover:text-blue-400
              transition
              duration-300
            "
            >
              Home
            </a>

            <a
              href="/products"
              className="
              hover:text-purple-400
              transition
              duration-300
            "
            >
              Products
            </a>

            <a
              href="/orders"
              className="
              hover:text-pink-400
              transition
              duration-300
            "
            >
              Orders
            </a>

            <a
              href="/cart"
              className="
              hover:text-yellow-400
              transition
              duration-300
            "
            >
              Cart
            </a>

            <a
              href="/login"
              className="
              hover:text-green-400
              transition
              duration-300
            "
            >
              Login
            </a>

          </div>

        </div>

        {/* SOCIALS */}
        <div
          className="
          flex
          items-center
          justify-center
          gap-6
          mt-10
          text-2xl
        "
        >

          <button
            className="
            w-12
            h-12
            rounded-full
            bg-white/10
            hover:bg-blue-500
            transition-all
            duration-300
            hover:scale-110
          "
          >
            🌐
          </button>

          <button
            className="
            w-12
            h-12
            rounded-full
            bg-white/10
            hover:bg-pink-500
            transition-all
            duration-300
            hover:scale-110
          "
          >
            📸
          </button>

          <button
            className="
            w-12
            h-12
            rounded-full
            bg-white/10
            hover:bg-sky-500
            transition-all
            duration-300
            hover:scale-110
          "
          >
            🐦
          </button>

          <button
            className="
            w-12
            h-12
            rounded-full
            bg-white/10
            hover:bg-purple-500
            transition-all
            duration-300
            hover:scale-110
          "
          >
            💬
          </button>

        </div>

        {/* BOTTOM */}
        <div
          className="
          mt-10
          pt-8
          border-t
          border-white/10
          text-center
        "
        >

          <p
            className="
            text-gray-400
            text-sm
            md:text-base
          "
          >

            © 2026 ShopBot AI Ecommerce.
            All rights reserved.

          </p>

          <p
            className="
            mt-3
            text-gray-500
            text-sm
          "
          >

            Built with ❤️ using React, TailwindCSS,
            AI & modern ecommerce technologies.

          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;