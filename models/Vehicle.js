const mongoose = require("mongoose")
const vehicleSchema = mongoose.Schema({
name: String,
type: String,
noofpassangers: Number
})
module.exports = mongoose.model("Vehicle",vehicleSchema)