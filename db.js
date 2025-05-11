const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kuwarjain394:VNgeX7TNT1MV4BAm@properties.dn1a7zn.mongodb.net/?retryWrites=true&w=majority&appName=Properties", {
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
