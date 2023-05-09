import CategoryModel from "../models/categoryModel.js";

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({ message: categories });
    } catch (err) {
        next(err);
    }
};

export const getCategoryById = async (req, res, next) => {
    try{
        const category = await CategoryModel.findById(req.params.id);

    // check if service doesn't exist
    if (!category) return res.json("Category Not Found");

    res.status(200).json({ message: category });
    }
    catch (err) {
        next(err);
    }
}

export const addCategory = async (req, res) => {
    try{
        const newCategory = await CategoryModel({
            name: req.body.name,
        }) 
        await newCategory.save();
        res.status(200).json({ message: newCategory });
    }
    catch (err) {
        res.json({ err: err.message });
    }
}
