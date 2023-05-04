import Users from "@/models/Users"
import connectDB from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res)=>{
    if(req.method == 'POST'){
        let user = await Users.findOne({email: req.body.email})

        if(user){
            var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
        if(req.body.email == user.email && req.body.password == originalText){
            var token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
            res.status(200).json({success: "User Logged In", token})
        }
        else{
            res.status(403).json({error: "Invalid Credentials!"})
        }
    }
    else{
        res.status(403).json({error: "Invalid Credentials!"})
    }
    }
    else{
        res.status(403).json({error: "Not Allowed"})
    }
}

export default connectDB(handler)