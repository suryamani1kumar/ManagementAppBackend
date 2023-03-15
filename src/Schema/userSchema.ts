import { Schema, model } from "mongoose";
import { usersDetails } from "../utils/type";

const userSchema = new Schema<usersDetails>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const user = model("User", userSchema);

export default user;
