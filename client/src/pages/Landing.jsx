import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function Landing() {

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center overflow-hidden">

      <div className="text-center px-6 max-w-5xl">

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight"
        >
          Welcome To <br />

          <span className="text-blue-500">
            ShopBot AI
          </span>

        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
        >
          Experience the future of ecommerce with
          AI-powered shopping, smart recommendations,
          and premium tech products.
        </motion.p>

        {/* BUTTONS */}
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
            delay: 1,
            duration: 1,
          }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >

          <Link
            to="/store"
            className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl transition duration-300"
          >
            Enter Store
          </Link>

          <Link
            to="/login"
            className="border border-white hover:bg-white hover:text-black px-10 py-5 rounded-2xl text-xl font-bold transition duration-300"
          >
            Login
          </Link>

        </motion.div>

      </div>

    </div>

  );

}

export default Landing;