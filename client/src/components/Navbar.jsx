import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  CartContext,
} from "../context/CartContext";

function Navbar() {

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const {
    cartItems,
  } = useContext(
    CartContext
  );

  // TOTAL CART ITEMS
  const totalItems =
    cartItems.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  // LOGOUT
  const handleLogout =
    () => {

      logout();

      navigate("/login");

    };

  return (

    <nav
      className="
      sticky
      top-0
      z-[999]
      backdrop-blur-xl
      bg-black/70
      border-b
      border-white/10
      shadow-2xl
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        md:px-10
        py-5
        flex
        items-center
        justify-between
      "
      >

        {/* LOGO */}
        <Link
          to="/store"
          className="
          text-3xl
          md:text-4xl
          font-extrabold
          bg-gradient-to-r
          from-blue-400
          via-purple-400
          to-pink-500
          bg-clip-text
          text-transparent
          tracking-wide
        "
        >

          ShopBot AI

        </Link>

        {/* DESKTOP MENU */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          text-white
          font-medium
        "
        >

          <Link
            to="/store"
            className="
            hover:text-blue-400
            transition
            duration-300
          "
          >
            Home
          </Link>

          <Link
            to="/products"
            className="
            hover:text-purple-400
            transition
            duration-300
          "
          >
            Products
          </Link>

          <Link
            to="/orders"
            className="
            hover:text-pink-400
            transition
            duration-300
          "
          >
            Orders
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="
            relative
            hover:text-yellow-400
            transition
          "
          >

            🛒 Cart

            {totalItems > 0 && (

              <span
                className="
                absolute
                -top-3
                -right-4
                bg-gradient-to-r
                from-red-500
                to-pink-500
                text-white
                text-xs
                font-bold
                px-2
                py-1
                rounded-full
                shadow-lg
              "
              >

                {totalItems}

              </span>

            )}

          </Link>

          {/* USER */}
          {user ? (

            <div className="flex items-center gap-4">

              <div
                className="
                bg-white/10
                px-4
                py-2
                rounded-2xl
                border
                border-white/10
              "
              >

                <p className="text-xs text-gray-300">
                  Welcome back
                </p>

                <p className="font-bold text-white">
                  {user.name}
                </p>

              </div>

              <button
                onClick={
                  handleLogout
                }
                className="
                px-5
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-pink-500
                hover:scale-105
                transition-all
                duration-300
                font-semibold
                shadow-lg
              "
              >

                Logout

              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="
              px-5
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              hover:scale-105
              transition-all
              duration-300
              font-semibold
              shadow-lg
            "
            >

              Login

            </Link>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="
          md:hidden
          text-white
          text-3xl
        "
        >

          ☰

        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div
          className="
          md:hidden
          bg-black/95
          border-t
          border-white/10
          px-6
          py-6
          space-y-5
          text-white
        "
        >

          <Link
            to="/store"
            className="block hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="block hover:text-purple-400"
          >
            Products
          </Link>

          <Link
            to="/orders"
            className="block hover:text-pink-400"
          >
            Orders
          </Link>

          <Link
            to="/cart"
            className="block hover:text-yellow-400"
          >
            🛒 Cart ({totalItems})
          </Link>

          {user ? (

            <>

              <div
                className="
                bg-white/10
                p-4
                rounded-2xl
              "
              >

                <p className="text-gray-300 text-sm">
                  Logged in as
                </p>

                <p className="font-bold">
                  {user.name}
                </p>

              </div>

              <button
                onClick={
                  handleLogout
                }
                className="
                w-full
                bg-gradient-to-r
                from-red-500
                to-pink-500
                py-3
                rounded-2xl
                font-semibold
              "
              >

                Logout

              </button>

            </>

          ) : (

            <Link
              to="/login"
              className="
              block
              text-center
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              py-3
              rounded-2xl
              font-semibold
            "
            >

              Login

            </Link>

          )}

        </div>

      )}

    </nav>

  );

}

export default Navbar;