import mongoose from "mongoose";
import ItemData from "../models/orderDetails.js";

export const getItems = async (req, res) => {
    try {
        const Items = await ItemData.find();
        res.status(200).json(Items);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getItem = async (req, res) => {
    try {
        const ItemID = req.params.id;
        const Item = await ItemData.findById(ItemID)
        if(Item){
            res.status(200).json(Item);
        }
        else res.status(404).json({ message: "Not Found" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const addItem = async (req, res) => {
    try {
        const itemInData = req.body;
        const itemDB = await ItemData.create({
            productID: itemInData.productID,
            quantity: itemInData.quantity,
        });
        console.log(itemDB);
        res.status(200).json({
            message: {
                status: "success",
                dataCreated: itemDB,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const itemInData = req.body;
        const id = req.params.id;
        const updatedData = {
            productID: itemInData.productID,
            quantity: itemInData.quantity,
        }
        const Item = await ItemData.findByIdAndUpdate(id, updatedData);
        res.status(200).json({
            message: {
                status: "success",
                oldData: updatedData,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const Item = await ItemData.findById(id);
        await ItemData.deleteOne(Item);
        res.status(200).json({
            message: {
                status: "success",
                oldData: Item,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

