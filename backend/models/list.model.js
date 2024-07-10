import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: [],
    },
  ],
});

const List = mongoose.model("List", ListSchema);
export default List;
