import LocationModel from "../models/locationModel.js";

// ************* GET ALL CATEGORIES **************
export const getAllLocations = async (req, res, next) => {
    try {
        const locations = await LocationModel.find();
        res.status(200).json({ message: locations });
    } catch (err) {
        next(err);
    }
};

// ************* GET CATEGORY BY ID **************
export const getLocationById = async (req, res, next) => {
    try{
        const location = await LocationModel.findById(req.params.id);

    // check if service doesn't exist
    if (!location) return res.json("Location Not Found");

    res.status(200).json({ message: location });
    }
    catch (err) {
        next(err);
    }
}

// ************* ADD CATEGORY ****************
export const addLocation = async (req, res) => {
    try{
        const newLocation = await LocationModel({
            name: req.body.name,
        }) 
        await newLocation.save();
        res.status(200).json({ message: newLocation });
    }
    catch (err) {
        res.json({ err: err.message });
    }
}

// ************** UPDATE CATEGORY ***************
export const updateLocation = async (req, res) => {
    try {
      let update = {
        name: req.body.name,
      };
      const location = await LocationModel.findById(req.params.id);
  
      // check if the training does not exist
      if (!location) {
        return res.status(404).json({ status: 404, message: "Not Found" });
      }

      const updatedLocation = await LocationModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        {
          new: true,
        }
      );
  
      res.status(200).json({ message: updatedLocation });
    } catch (error) {
      res.json({ err: error.message });
    }
  };

//****************** DELETE CATEGORY ***************************/
export const deleteLocation = async (req, res) => {
    try {
        await LocationModel.findByIdAndDelete(req.params.id).then((response) => {
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