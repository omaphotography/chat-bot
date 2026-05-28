const supabase = require("../config/supabaseClient");

const getProducts = async (req, res) => {

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.status(200).json(data);

};

module.exports = {
  getProducts,
};