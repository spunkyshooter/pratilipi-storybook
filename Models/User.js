import { Schema, model } from "mongoose";

const ID = Schema.Types.ObjectId;
const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stories: [
    {
      type: ID,
      ref: "story",
    },
  ],
});

const UserModel = model("user", User);

export default UserModel;
