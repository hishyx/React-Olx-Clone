import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt.js";

export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");
  const user = await User.findOne({ email: email });

  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid email or password");

  const safeUser = { id: user._id.toString(), name: user.name, email: user.email, dp: user.dp };
  return { token: generateJwtToken(safeUser), user: safeUser };
};
