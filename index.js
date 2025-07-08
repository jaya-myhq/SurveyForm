const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const Survey = require("./models/survey");
require("./db"); // MongoDB connection
const cors = require("cors");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Optional: serve uploaded files

// Get All Surveys
app.get("/buildingSurvey", async (req, res) => {
  try {
    const surveys = await BuildingSurvey.find();
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surveys." });
  }
});
app.post("/survey", async (req, res) => {
    const {
      streetAddress,
      city,
      googleMapLink,
      buildingName,
      pointOfContact,
      numberOfFloors,
      totalArea,
      googleDriveLink,
      localTransport,
      floorConfiguration, // should be an array of objects
      efficiency,
      floorPattern
    } = req.body;
  
    try {
      const result = await Survey.findOne({ streetAddress });

      if(result){
        const updatedSurvey = await Survey.findOneAndUpdate(
          { streetAddress }, // filter
          {
            city,
            googleMapLink,
            buildingName,
            pointOfContact,
            numberOfFloors,
            totalArea,
            googleDriveLink,
            localTransport,
            floorConfiguration,
            efficiency,
            floorPattern
          },
          { new: true } // return the updated document
        );
  
        res.status(200).json({
          message: "Survey updated successfully",
          survey: updatedSurvey
        });
      }else{
      const newSurvey = new Survey({
        streetAddress,
        city,
        googleMapLink,
        buildingName,
        pointOfContact,
        numberOfFloors,
        totalArea,
        googleDriveLink,
        localTransport,
        floorConfiguration,
        efficiency,
        floorPattern
      });
      
      await newSurvey.save();
      res.status(201).json({
        message: "Survey saved successfully",
        survey: newSurvey
      });
    }
  
    } catch (err) {
      console.error("Error saving survey:", err);
      res.status(400).json({
        message: "Error saving survey",
        error: err.message
      });
    }
  });
  
  // GET API to fetch all surveys
  app.get("/survey", async (req, res) => {
    try {
      const surveys = await Survey.find();
      res.status(200).json(surveys);
    } catch (err) {
      res.status(400).json({ message: "Error fetching surveys", error: err });
    }
  });

  app.get("/survey/:searchString", async (req, res) => {
    const searchString = req.params.searchString;
  
    try {
      const results = await Survey.find({
        streetAddress: { $regex: searchString, $options: "i" } // case-insensitive
      });
  
      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching surveys:", error);
      res.status(500).json({ message: "Server error while searching surveys." });
    }
  });
  
// In your server file (e.g., app.js or routes file)
app.delete("/survey/:streetAddress", async (req, res) => {
  const { streetAddress } = req.params;

  try {
    const deletedSurvey = await Survey.findOneAndDelete({ streetAddress });

    if (deletedSurvey) {
      res.status(200).json({ message: "Survey deleted successfully" });
    } else {
      res.status(404).json({ message: "Survey not found" });
    }
  } catch (err) {
    console.error("Error deleting survey:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/keepalive", (req, res) => {
  res.status(200).json({ message: "Server is awake" });
});

app.listen(3000, () => console.log("Server started on port 3000"));
