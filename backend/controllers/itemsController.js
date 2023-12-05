import mongoose from "mongoose";
import ItemData from "../models/items.js";
import fs from "fs"

export const getItems = async (req, res) => {
    try {
        const Items = await ItemData.find();
        console.log(Items);
        res.status(200).json(Items);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
export const addItem = async (req, res) => {
    try {
        // 2- VALIDATE THE IMAGE
        if (!req.files) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Image is Required",
                    },
                ],
            });
        }
        const itemInData = req.body;
        const imageNames = req.files.map((image) => image.filename)
        const ItemDB = await ItemData.create({
            title: itemInData.title,
            description: itemInData.description,
            category: itemInData.category,
            price: itemInData.price,
            images: imageNames
        });
        console.log(ItemDB);
        res.status(200).json({
            message: {
                status: "success",
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
            price: itemInData.price,
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
        console.log(id);
        const Item = await ItemData.findById(id);
        console.log(Item.images);
        if(Item.images){
            Item.images.forEach(img => {
                fs.unlinkSync("./upload/" + img); 
            });
        }
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

