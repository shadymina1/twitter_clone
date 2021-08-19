const User = require('../../Models/User');
const md5 = require('md5');
const jwt = require("jsonwebtoken");
module.exports = registration = async (userName ,password) => {
    const user = new User(
        {
            userName: userName ,
            password : md5(password)
        });
   const newUser =  await user.save();

   const token = jwt.sign(
       { user_id: newUser._id, user_name : userName },
       process.env.JWT_SECRET,
       {
           expiresIn: process.env.JWT_EXPIRE,
   });

    return {
        "user" : newUser,
        "token" : token,
        "message" : "success"
    }
}
