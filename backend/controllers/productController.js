import ProductData from "../models/product.js";
import fs from "fs"

export const getProducts = async (req, res) => {
    try {
        const Products = await ProductData.find();
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
        const productId = req.params.id;

        // Check if the product exists
        const existingProduct = await ProductData.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update product details
        const updatedProductData = {
            title: req.body.title || existingProduct.title,
            description: req.body.description || existingProduct.description,
            category: req.body.category || existingProduct.category,
            price: req.body.price || existingProduct.price,
        };

        // If you want to update images, handle it here
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((image) => image.filename);
            updatedProductData.images = newImages;
            
            // Delete old images from the server (if needed)
            for (const oldImage of existingProduct.images) {
                // Delete logic (adjust this based on your server setup)
                fs.unlinkSync("./upload/" + oldImage); 
            }
        }

        // Update the product in the database
        const updatedProduct = await ProductData.findByIdAndUpdate(
            productId,
            updatedProductData,
            { new: true } // Return the updated document
        );

        res.status(200).json({
            status: "success",
            dataUpdated: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

