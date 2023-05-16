import { Schema, model } from "mongoose";

const locationSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
  },
  {
    collection: "location",
  }
);

const LocationModel = model("location", locationSchema);

export default LocationModel;