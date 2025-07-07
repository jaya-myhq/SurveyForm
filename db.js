const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jayamukesh:KUudX5ZtsrQz0gM6@cluster0.s5y4hk8.mongodb.net/?retryWrites=true&w=majority&appName=Properties", {
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
