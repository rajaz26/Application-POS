import User from '../models/User.js'

export const loginController = async (req, res, next) => {
    const { phone, password } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
     
      res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  };
  

  export const registerController = async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
      });
  
      await newUser.save();
      res.status(200).send("User has been created");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  