const mongoose = require("mongoose");

const connectDB = async () => {
    try {
       let req = await mongoose.connect("mongodb://localhost:27017/Basic-Authentication");
        if (!req){
           console.log("mongodb connected succesfully");
    };
}
   catch (error) {
        console.log("error in connecting");
    };
};

module.exports = connectDB;