import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ChatWidget from "./components/ChatWidget";

import ProtectedRoute from "./components/ProtectedRoute";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

import Home from "./pages/Home";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import NotFound from "./pages/NotFound";

import Orders from "./pages/Orders";

import Products from "./pages/Products";

import Register from "./pages/Register";

// SHARED LAYOUT
function StoreLayout({
  children,
}) {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <ChatWidget />

      {children}

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* STORE / HOME */}
        <Route
          path="/store"
          element={

            <ProtectedRoute>

              <StoreLayout>

                <Home />

              </StoreLayout>

            </ProtectedRoute>

          }
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={

            <ProtectedRoute>

              <StoreLayout>

                <Products />

              </StoreLayout>

            </ProtectedRoute>

          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={

            <ProtectedRoute>

              <StoreLayout>

                <Cart />

              </StoreLayout>

            </ProtectedRoute>

          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={

            <ProtectedRoute>

              <StoreLayout>

                <Checkout />

              </StoreLayout>

            </ProtectedRoute>

          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={

            <ProtectedRoute>

              <StoreLayout>

                <Orders />

              </StoreLayout>

            </ProtectedRoute>

          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={

            <div className="min-h-screen bg-gray-100">

              <Login />

            </div>

          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={

            <div className="min-h-screen bg-gray-100">

              <Register />

            </div>

          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;