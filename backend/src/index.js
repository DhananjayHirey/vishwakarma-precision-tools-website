import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/db.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERRR:", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server listening on http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection Error: ", error);
  });
