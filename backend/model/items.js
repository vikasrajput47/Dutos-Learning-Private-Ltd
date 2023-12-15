import mongoose from "mongoose";
const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  rating: {
    rate: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
      required:true,
    },
    permission: {
      allow: {
        type: Boolean,
        required:true
      },
      vendorName: {
        type: String,
        required:true
      }
      
        

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Item = mongoose.model('Item', schema);


