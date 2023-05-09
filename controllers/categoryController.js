import CategoryModel from "../models/categoryModel.js";

// ************* GET ALL CATEGORIES **************
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({ message: categories });
    } catch (err) {
        next(err);
    }
};

// ************* GET CATEGORY BY ID **************
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

// ************* ADD CATEGORY ****************
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

// ************** UPDATE CATEGORY ***************
export const updateCategory = async (req, res) => {
    try {
      let update = {
        name: req.body.name,
      };
      const category = await CategoryModel.findById(req.params.id);
  
      // check if the training does not exist
      if (!category) {
        return res.status(404).json({ status: 404, message: "Not Found" });
      }

      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        {
          new: true,
        }
      );
  
      res.status(200).json({ message: updatedCategory });
    } catch (error) {
      res.json({ err: error.message });
    }
  };

//****************** DELETE CATEGORY ***************************/
export const deleteCategory = async (req, res) => {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id).then((response) => {
        if (!response) {
            res.status(404).send({ status: 404, message: "Not Found" });
        } else {
            res.status(200).send({ status: 200, message: "Deleted successfully" });
        }
        });
    } catch (error) {
        res.json({ err: error.message });
    }
};