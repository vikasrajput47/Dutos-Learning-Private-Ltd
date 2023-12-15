import { Item } from "../model/items.js";
import { Vendor } from "../model/vender.js";


export const allow = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  const vendor = await Vendor.findById(req.Vuser);
  item.permission.allow = true;
  item.permission.vendorName = vendor.name;
  await item.save();
  res.status(202).json({
    success: true,
    message: "Allowed",
  });
};

export const reject = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  const vendor = await Vendor.findById(req.Vuser);
  item.permission.allow = false;
  item.permission.vendorName = vendor.name;
  await item.save();
  res.status(202).json({
    success: true,
    message: "rejected",
  });
};




export const  userItems = async (req, res) => {
   
    try {
      const items = await Item.find({ user: req.Uuser._id });
      if (!items) {
        return res.status(404).json({
          success: false,
          message: "some error",
        });
      }

      res.status(200).json({
        success: true,
        items,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message:'error'
     }) 
    }

};



export const allItems = async (req, res) => {
  const items = await Item.find();
  if (!items) {
    return res.status(404).json({
      message: "some error",
    });
  }
  res.status(200).json({
    success: true,
    items,
  });
};


export const setItems = async (req, res) => {
  const { id, title, price, description, category, image, rating } = req.body;
  const permission = {
    allow: false,
    vendorName: "na",
  };
  await Item.create({
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    user: req.Uuser,
    permission,
  });
  res.status(404).json({
    success: true,
    message: "item added",
  });
};