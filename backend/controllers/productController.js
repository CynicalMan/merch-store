import mongoose from "mongoose";
import ProductData from "../models/product.js";
import fs from "fs"

export const getProducts = async (req, res) => {
    try {
        const Products = await ProductData.find();
        console.log(Products);
        res.status(200).json(Products);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
export const getProduct = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const Product = await ProductData.findById(ProductID)
        if(Product){
            res.status(200).json(Product);
        }
        else res.status(404).json({ message: "Not Found" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
export const addProduct = async (req, res) => {
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
        const productInData = req.body;
        const imageNames = req.files.map((image) => image.filename)
        const productDB = await ProductData.create({
            title: productInData.title,
            description: productInData.description,
            category: productInData.category,
            price: productInData.price,
            images: imageNames
        });
        console.log(productDB);
        res.status(200).json({
            message: {
                status: "success",
                dataCreated: productDB,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const productInData = req.body;
        const id = req.params.id;
        const updatedData = {
            title: productInData.title,
            description: productInData.description,
            category: productInData.category,
            price: productInData.price,
        }
        const Product = await ProductData.findByIdAndUpdate(id, updatedData);
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
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const Product = await ProductData.findById(id);
        console.log(Product.images);
        if(Product.images){
            Product.images.forEach(img => {
                fs.unlinkSync("./upload/" + img); 
            });
        }
        await ProductData.deleteOne(Product);
        res.status(200).json({
            message: {
                status: "success",
                oldData: Product,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

