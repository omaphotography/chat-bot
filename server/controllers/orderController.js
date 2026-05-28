const supabase =
  require("../config/supabaseClient");

// CREATE ORDER
const createOrder = async (
  req,
  res
) => {

  try {

    const {

      user_id,

      customer_name,

      customer_email,

      products,

      total_price,

      order_status,

      tracking_number,

      estimated_delivery,

    } = req.body;

    const {

      data,

      error,

    } = await supabase
      .from("orders")
      .insert([

        {

          user_id,

          customer_name,

          customer_email,

          products,

          total_price,

          order_status,

          tracking_number,

          estimated_delivery,

        },

      ])
      .select();

    if (error) {

      return res.status(500).json({

        message:
          error.message,

      });

    }

    res.status(201).json({

      message:
        "Order placed successfully",

      order: data[0],

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

// GET USER ORDERS
const getUserOrders = async (
  req,
  res
) => {

  try {

    const { userId } =
      req.params;

    const {

      data,

      error,

    } = await supabase
      .from("orders")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {

      return res.status(500).json({

        message:
          error.message,

      });

    }

    res.status(200).json(
      data
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

// GET ALL ORDERS (ADMIN)
const getAllOrders = async (
  req,
  res
) => {

  try {

    const {

      data,

      error,

    } = await supabase
      .from("orders")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {

      return res.status(500).json({

        message:
          error.message,

      });

    }

    res.status(200).json(
      data
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

// CANCEL ORDER
const cancelOrder =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {

        data,

        error,

      } = await supabase
        .from("orders")
        .update({

          order_status:
            "Cancelled",

        })
        .eq("id", id)
        .select();

      if (error) {

        return res.status(500).json({

          message:
            error.message,

        });

      }

      res.status(200).json({

        message:
          "Order cancelled successfully",

        order:
          data[0],

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

// UPDATE ORDER STATUS (ADMIN)
const updateOrderStatus =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        order_status,
      } = req.body;

      const {

        data,

        error,

      } = await supabase
        .from("orders")
        .update({

          order_status,

        })
        .eq("id", id)
        .select();

      if (error) {

        return res.status(500).json({

          message:
            error.message,

        });

      }

      res.status(200).json({

        message:
          "Order status updated",

        order:
          data[0],

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };

module.exports = {

  createOrder,

  getUserOrders,

  getAllOrders,

  cancelOrder,

  updateOrderStatus,

};