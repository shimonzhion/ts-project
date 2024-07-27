const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../validation/user-valid");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userRegister = async (req, res) => {
  const { firstName, lastName, email, password, birthdate, image, phone } =
    req.body;

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      image,
      birthdate,
    });
    if (user) {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,     
        secure: false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      
      return res.status(200).json({
        success: true,
        result: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          phone: user.phone,
          birthdate: user.birthdate,
          token: token,
        },
      });
    } else {
      return res.status(400).json({ message: "User could not be created" });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        result: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: token,
        },
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};


const sendMessage = (req,res)=>{
  return res.json({message:"welcome"})
}

module.exports = {userLogin, userRegister, sendMessage}