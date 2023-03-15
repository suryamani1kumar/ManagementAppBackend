import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DATA_BASE === undefined ? "" : process.env.DATA_BASE;
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log(`DATA_BASE connected on ${process.env.DATA_BASE}`))
  .catch((err) => {
    console.log(err.message);
  });
