import Stocks from "@/models/Stocks"
import connectDB from "@/middleware/mongoose"

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let stocks = await Stocks.find({$or: [
            { Symbol: { $regex: `${req.body.stock}`, $options: "i" } },
            { Name: { $regex: `${req.body.stock}`, $options: "i" }  }
          ]})
        if(stocks.length !== 0){
            res.status(200).json({stocks})
        }
        else{
            res.status(404).json({error:"Stocks Not Found"})
        }
        
    }
    else{
        res.status(403).json({error: "Bad Request"})
    }
    
    //let user = await Users.findOne({ email: req.body.email })

    
}

export default connectDB(handler)
