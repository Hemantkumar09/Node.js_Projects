import { Product } from "../Model/Product.js";

export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.json({ message: "Product added successfully", product, success: true });
  } catch (error) {
    res.json({ message: "Error in adding product", error, success: false });
  }
};


export const getAllProduct = async (req,res) => {
    try{
        let product = await Product.find();
        if(!product) return res.json({"message" : "No Product available", success : false})
        res.json({"message" : "Product Details", product, success: true});
    }catch(err){
        res.json({"message": "Error in getting all product details.", err, success : false});
    }
}

export const getProductByID = async (req,res) => {
    const id = req.params.id;
    try{
        let product = await Product.findById(id);
        if(!product) return res.json({"message" : "Invalid ID", success : false})
        res.json({"message" : "Product Details", product, success: true});
    }catch(err){
        res.json({"message": "Error in getting product details.", err, success : false});
    }
}

export const updateProductByID = async (req,res) => {
    const id = req.params.id;
    try{
        let product = await Product.findByIdAndUpdate(id, req.body, {new : true});
        if(!product) return res.json({"message" : "Invalid ID", success : false})
        res.json({"message" : "Product Details Updated Successfully.", product, success: true});
    }catch(err){
        res.json({"message": "Error:- ", err, success : false});
    }
}

export const deleteProductByID = async (req,res) => {
    const id = req.params.id;
    try{
        let product = await Product.findByIdAndDelete(id);
        if(!product) return res.json({"message" : "Invalid ID", success : false})
        res.json({"message" : "Product Deleted Successfully.", success: true});
    }catch(err){
        res.json({"message": "Error:- ", err, success : false});
    }
}