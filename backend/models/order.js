import mongoose from "mongoose";
import orderDetailsModel from "./orderDetails.js";
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  userID: {
    type : mongoose.Schema.Types.ObjectId , 
    ref : 'user' 
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: Number,
  status: String,
  orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orderDetails' }], 
});

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel