const mongoose = require('mongoose');


module.exports = connectDB = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true ,
        useCreateIndex : true
    };
    mongoose.connect(
        'mongodb://localhost:27017/twitter',options,
        () => {
            // console.log("Database connected !")
        });
}



