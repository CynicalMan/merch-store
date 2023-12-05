const express = require('express')

export const getPromoters = async (req, res) => {
    try {
        const Category = await CategoryData.find();
        res.status(200).json(Category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const addPromoter = async (req, res) => {
    try {
        const promData = req.body;
        const Promoter = await PromoterData.create({
            name: promData.name,
            percentage: promData.percentage,
            ppl_visted: promData.ppl_visted,
            actual_ppl_visted:promData.actual_ppl_visted,
            profit:promData.profit,
            netProfit:promData.profit-(promData.percentage*promData.profit),
        });
        res.status(200).json({
            message: {
                status : "success",
                dataCreated: Promoter,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const updatePromoter = async (req, res) => {
    try {
        const promData = req.body;
        const id = req.params.id;
        const updatedData = {
            name: promData.name,
            percentage: promData.percentage,
            ppl_visted: promData.ppl_visted,
            actual_ppl_visted:promData.actual_ppl_visted,
            profit:promData.profit,
            netProfit:promData.profit-(promData.percentage*promData.profit),
        }
        const Promoter = await PromoterData.findByIdAndUpdate(id, updatedData);
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

export const deletePromoter = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const Promoter = await PromoterData.findByIdAndDelete(id);
        res.status(200).json({
            message: {
                status : "success",
                oldData: Promoter,
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

