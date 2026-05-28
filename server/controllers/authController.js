const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const supabase =
  require("../config/supabaseClient");

// REGISTER
const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // VALIDATION
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "All fields are required",
      });

    }

    // CHECK EXISTING USER
    const {
      data: existingUser,
    } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // SAVE USER
    const {
      data,
      error,
    } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password:
            hashedPassword,
        },
      ])
      .select();

    if (error) {

      return res.status(500).json({
        message:
          error.message,
      });

    }

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id: data[0].id,
        email: data[0].email,
      },

      "secretkey",

      {
        expiresIn: "7d",
      }

    );

    res.status(201).json({

      message:
        "Registration successful",

      token,

      user: data[0],

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

// LOGIN
const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const {
      data: user,
      error,
    } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid credentials",
      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials",
      });

    }

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id: user.id,
        email: user.email,
      },

      "secretkey",

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      message:
        "Login successful",

      token,

      user,

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

module.exports = {

  registerUser,

  loginUser,

};