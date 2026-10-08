import app from "./app.js";
import connectDB from "./src/config/db.js";

import { config } from "dotenv";

config();

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App is listening on http://localhost:${process.env.PORT}`);
  });
});
