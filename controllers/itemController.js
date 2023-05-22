import itemModel from "../models/itemModel.js";
import fs from 'fs';
import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import locationModel from "../models/locationModel.js";
// ************ GET ALL ITEMS ****************************

export const getAllItems = async (req, res, next) => {
    try{
        const items = await itemModel.find()
        res.status(200).json({message: items})
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

//************ GET ITEM BY ID ****************************/
export const getItemByID = async (req, res, next) => {
    try{
        const item = await itemModel.findById(req.params.id)
        if(!item) return res.status(404).json({ message: 'Item not found'})

        res.status(200).json({message: item })
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
export const addItem = async (req, res) => {
    try {
      const userId = await userModel.findById(req.body.userId);
      const categoryId = await categoryModel.findById(req.body.categoryId);
      const locationId = await locationModel.findById(req.body.locationId);
    //   Check if the userId exists
      if (!userId) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
  
    //   Check if the category exists
      if (!categoryId) {
        return res.status(404).json({ status: 404, message: "Category not found" });
      }
      if(!locationId){
        return res.status(404).json({ status: 404, message: "Location not found"});
      }
  
      const newItem = new itemModel({
        title: req.body.title,
        label: req.body.title,
        description: req.body.description,
        image: req.imagePath,
        locationId: req.body.locationId,
        isFound: req.body.isFound,
        dateFound: req.body.dateFound,
        userId: req.body.userId,
        categoryId: req.body.categoryId
      });
  
     await newItem.save();
      res.status(200).json({ success: true, message: newItem });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// ********************* Edit Item ****************
export const editItem = async (req, res) => {
  try {
    let update = {
      title: req.body.title,
      description: req.body.description,
      image: req.imagePath,
      locationId: req.body.locationId,
      isFound: req.body.isFound,
      dateFound: req.body.dateFound,
      userId: req.body.userId,
      categoryId: req.body.categoryId
    };
    const item = await itemModel.findById(req.params.id);

    // check if the item does not exist
    if (!item) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }

    // delete the old image
    if (req.imagePath) {
      fs.unlinkSync(item.image);
    }

    const updateditem = await itemModel.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      {
        new: true,
      }
    );

    res.status(200).json({ message: updateditem });
  } catch (error) {
    res.json({ err: error.message });
  }
};  
export const editIsFound = async (req, res) => {
  try {
    const { isFound } = req.body;
    const item = await itemModel.findById(req.params.id);

    // Check if the item does not exist
    if (!item) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }

    // Update the isFound property of the item
    item.isFound = isFound;
    const updatedItem = await item.save();

    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  
  //******************** Delete a project ***********************/ 
export const deleteItem = async (req, res) => {
    try {
      await itemModel.findByIdAndDelete(req.params.id).then((response) => {
        if (!response) {
          res.status(404).send({ status: 404, message: "Not Found" });
        } else {
          fs.unlinkSync(response.image);
          res.status(200).send({ status: 200, message: "Deleted successfully" });
        }
      });
    } catch (error) {
      res.json({ err: error.message });
    }
  };