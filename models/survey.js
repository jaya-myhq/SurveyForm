// models/Survey.js
const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema(
  {
    streetAddress: { type: String, required: true },
    city: { type: String },
    googleMapLink: { type: String },
    buildingName: { type: String },
    pointOfContact: { type: String },
    numberOfFloors: { type: String },
    totalArea: { type: String },
    efficiency: { type: String },
    googleDriveLink: { type: String },
    localTransport: [{ type: String }],
    floorPattern: { type: String },
    floorConfiguration: [
      {
        floor: String,
        unit1SuperArea: String,
        unit1CarpetArea: String,
        unit1Status: String,
        unit1RentQuoted: String,
        unit1ClientName: String,

        unit2SuperArea: String,
        unit2CarpetArea: String,
        unit2Status: String,
        unit2RentQuoted: String,
        unit2ClientName: String,

        unit3SuperArea: String,
        unit3CarpetArea: String,
        unit3Status: String,
        unit3RentQuoted: String,
        unit3ClientName: String,

        others: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Survey", SurveySchema);
