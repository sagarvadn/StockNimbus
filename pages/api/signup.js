import Users from "@/models/Users"
import connectDB from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
    if(req.method == 'POST'){
        const {email, name} = req.body
        let user = new Users({name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()})
        await user.save()
        res.status(200).json({success: "Success"})
    }
    else{
        res.status(403).json({error: "Not Allowed"})
    }
}

export default connectDB(handler)