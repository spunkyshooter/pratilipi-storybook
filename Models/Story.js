import { Schema, model } from "mongoose";
const ID = Schema.Types.ObjectId;

const Story = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: String,
    tags: {
      type: Array,
      default: ["Advance", "Technology"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: ID,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    //To handle a continuously refreshes, or opening in other tab, we need userId
    currentlyViewing: [{ date: Date, userId: ID }],
    visitors: [String],
  },
  { timestamps: true }
);

const StoryModel = model("story", Story);

export default StoryModel;
