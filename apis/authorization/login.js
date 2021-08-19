const User = require('../../Models/User');
const md5 = require('md5');
const jwt = require("jsonwebtoken");
module.exports = login = async (userName ,password) => {
   const user = await User.findOne(
       {
           userName : userName ,
           password : md5(password)
       });
    if(user){
        const token = jwt.sign(
            { user_id: user._id, user_name : userName },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            });

        return {
            "user" : user,
            "token" : token,
            "message" : "success"
        }
    }else{
        return false ;
    }
}
