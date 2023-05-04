import Stocks from "@/models/Stocks"
import connectDB from "@/middleware/mongoose"

const handler = async (req, res) => {
  if(req.method == 'POST'){
  let stock = await Stocks.findOne({
     Symbol: { $regex: `${req.body.stock}`, $options: "i" } 
  })
  if(stock){
    res.status(200).json({stock})
}
else{
    res.status(200).json({error:"Stock Symbol Not Found"})
}
}
else{
  res.status(403).json({error: "Bad Request"})
}
}

export default connectDB(handler)