import { Schema, model } from "mongoose";
import userModel from "./userModel.js";
import CategoryModel from "./categoryModel.js";
import locationModel from "./locationModel.js";
const itemSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter  a title"],
    },
    label: {
      type: String,
      required: [true, "Please enter  a label"],
    },
    description: {
      type: String,
      required: [true, "Please enter a valid email description of a the Item"],
      minLength: [20, "Description must be at least 20 characters"],
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref:"location",
      required: [true, "Please enter a location when Could be found"],
    },
    image: {
      type: String,
      //   required: [true, "Please enter an Image of the Lost Item "],
    },
    isFound: {
      type: Boolean,
      default: false,
    },
    dateFound: {
      type: String,
      require: [true, "Please enter a Date You Found this Item"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", // Update the reference name to "user"
      required: [true, "Please enter user information"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category", // Update the reference name to "category"
      required: [true, "Please enter category information"],
    },
  },
  {
    collection: "item",
  }
);
itemSchema.pre(["find", "findOne", "save", "create"], function () {
  this.populate({ path: "categoryId", model: CategoryModel });
  this.populate({ path: "userId", model: userModel });
  this.populate({ path: "locationId", model: locationModel })
});
const itemModel = model("item", itemSchema);

export default itemModel;
