import mongoose from "mongoose";
const schema =new mongoose.Schema({
    name: {
        type: String,
        require:true,
    }
    ,
    email: {
        type: String,
        require:true,
    }
    ,
    pass: {
        type: String,
        require:true,
    }
})

export const Vendor = mongoose.model('Vendor', schema);