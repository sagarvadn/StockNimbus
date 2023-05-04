const mongoose = require('mongoose');

const StocksSchema = new mongoose.Schema({
    Symbol: {type: String, required: true, unique: true},
    AssetType: {type: String},
    Name: {type: String, required: true},
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Exchange: {type: String, required: true},
    Currency: {type: String, required: true},
    Country: {type: String, required: true},
    Industry: {type: String},
    Address: {type: String}
}, {timestamps: true});

export default mongoose.models.Stocks || mongoose.model("Stocks", StocksSchema);