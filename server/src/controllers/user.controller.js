import * as userServices from "../services/user.services.js";
import User from "../models/user.model.js";

export const loginUser = async (req, res) => {
  res.json(await userServices.loginUser(req.body));
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("name email dp");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
