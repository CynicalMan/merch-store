import mongoose from "mongoose";
import ItemData from "../models/items.js";

export const getItems = async (req, res) => {
    try {
        const Items = await ItemData.find();
        res.status(200).json(Items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const addItem = async (req, res) => {
    try {
        const itemInData = req.body;
        const ItemDB = await ItemData.create({
            title: itemInData.title,
            description: itemInData.description,
            category: itemInData.category,
            price:itemInData.price,
        });
        res.status(200).json({
            message: {
                status : "success",
                dataCreated: ItemDB,
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
            title: itemInData.title,
            description: itemInData.description,
            category: itemInData.category,
            price:itemInData.price,
        }
        const Item = await ItemData.findByIdAndUpdate(id, updatedData);
        res.status(200).json({
            message: {
                status : "success",
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
        console.log(id);
        const Item = await ItemData.findByIdAndDelete(id);
        res.status(200).json({
            message: {
                status : "success",
                oldData: Item,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

