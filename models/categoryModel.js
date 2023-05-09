import { Schema, model } from "mongoose";

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Category Name"],
    },
  },
  {
    collection: "category",
  }
);

const CategoryModel = model("category", categorySchema);

export default CategoryModel;