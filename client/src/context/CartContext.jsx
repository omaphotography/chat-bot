import {
  createContext,
  useEffect,
  useState,
} from "react";

const CartContext =
  createContext();

function CartProvider({
  children,
}) {

  // LOAD SAVED CART
  const savedCart =
    localStorage.getItem(
      "cartItems"
    );

  const [cartItems, setCartItems] =
    useState(

      savedCart
        ? JSON.parse(savedCart)
        : []

    );

  // SAVE CART
  useEffect(() => {

    localStorage.setItem(

      "cartItems",

      JSON.stringify(cartItems)

    );

  }, [cartItems]);

  // ADD TO CART
  const addToCart = (
    product
  ) => {

    setCartItems(
      (prevItems) => {

        const existingItem =
          prevItems.find(
            (item) =>
              item.id ===
              product.id
          );

        // PRODUCT EXISTS
        if (
          existingItem
        ) {

          return prevItems.map(
            (item) =>

              item.id ===
              product.id

                ? {

                    ...item,

                    quantity:
                      item.quantity +
                      1,

                  }

                : item
          );

        }

        // NEW PRODUCT
        return [

          ...prevItems,

          {

            ...product,

            quantity: 1,

          },

        ];

      }
    );

  };

  // REMOVE PRODUCT
  const removeFromCart = (
    id
  ) => {

    setCartItems(
      (prevItems) =>

        prevItems.filter(
          (item) =>
            item.id !== id
        )
    );

  };

  // CLEAR CART
  const clearCart = () => {

    setCartItems([]);

  };

  return (

    <CartContext.Provider
      value={{

        cartItems,

        addToCart,

        removeFromCart,

        clearCart,

      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export {
  CartContext
};

export default CartProvider;