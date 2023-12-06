import mongoose from "mongoose";
import OrderModel from "../models/order.js";
import OrderDetailsModel from "../models/orderDetails.js";
import ProductModel from "../models/product.js";
import UserModel from "../models/user.js";
export const getOrders = async (req, res) => {
  try {
    const Orders = await OrderModel.find();
    res.status(200).json(Orders);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getOrder = async (req, res) => {
  try {
    const OrderID = req.params.id;
    const Order = await OrderMode.findById(OrderID);
    if (Order) {
      res.status(200).json(Order);
    } else res.status(404).json({ message: "Not Found" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const addOrder = async (req, res) => {
  try {
    const { userID, products } = req.body;
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let totalAmount = 0;
    const orderDetails = [];

    for (const productInfo of products) {
      const { productId, quantity } = productInfo;

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const subtotal = product.price * quantity;
      totalAmount += subtotal;
      const orderDetail = new OrderDetailsModel({
        product: productId,
        quantity,
        subtotal,
      });
      orderDetails.push(orderDetail);
    }

    const newOrder = new OrderModel({
      user: userID,
      totalAmount,
      status: "Pending", // Set initial status
      orderDetails,
    });
    
    const savedOrder = await newOrder.save();
    for (const orderDetail of orderDetails) {
      await orderDetail.save();
    }

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Check if the orderId is valid
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
  
      // Check if the order exists
      const existingOrder = await OrderModel.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Assuming you want to update the order status
      const { newStatus } = req.body;
  
      // Update the order status
      existingOrder.status = newStatus || existingOrder.status; // Update only if newStatus is provided
  
      // Save the updated order
      const updatedOrder = await existingOrder.save();
  
      res.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Delete Order API
export const deleteOrder = async (req, res) => {
    try {
      const  orderId  = req.params.id;
      // Check if the orderId is valid
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ error: "Invalid order ID" });
      }
  
      // Check if the order exists
      const existingOrder = await OrderModel.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Delete associated order details first
      for (const orderDetailId of existingOrder.orderDetails) {
        await OrderDetailsModel.findByIdAndDelete(orderDetailId);
      }
  
      // Delete the order itself
      await OrderModel.findByIdAndDelete(orderId);
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  