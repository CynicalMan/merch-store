import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderDetailsSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
  quantity: Number,
  subtotal: Number,
});

const orderDetailsModel = mongoose.model("orderDetail", orderDetailsSchema);

export default orderDetailsModel;