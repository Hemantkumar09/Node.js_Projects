import { Cart } from "../Model/Cart.js";

export const addProductToCart = async (req, res) => {
    const {productId, title, qty, price} = req.body

    const userId = req.user;

    if(!userId) return res.json ({message : "User ID not Found!"});

    let cart = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({userId, items: []})
    } 

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId);

    if(itemIndex > -1){
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price = qty * price;
    }else{
        cart.items.push({productId, title, qty, price});
    }
    await cart.save();

    return res.json({message: "Item Added Successfully", cart, success: true});
}

//get cart details
export const getCart = async (req,res) => {
    const userId = req.user

    const cart = await Cart.findOne({userId})
    if(!cart) return res.json({message : "Cart Not Found"});

    return res.json({message: "Cart Details", cart, success : true})
}

//remove product from cat for a user ID
export const removeProductFromCart = async(req,res) => {
    const productId = req.params.productId;
    const userId = req.user

    const cart = await Cart.findOne({userId})
    if(!cart) return res.json({message : "Cart Not Found", success: false});

    cart.items = cart.items.filter((item) => item.productId != productId);
    cart.save();

    return res.json({message: "Product Removed", success : true})
}

//clear Cart for a user ID
export const clearCartForUserID = async (req,res) => {
    const userId = req.user

    const cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({items: []})
    }else{
        cart.items = []
    }

    await cart.save()

    return res.json({message: "Cart Cleared.",cart, success: true});
}

export const decreaseProductQty = async (req,res) => {
    const {productId, qty} = req.body

    const userId = req.user;

    if(!userId) return res.json ({message : "User ID not Found!"});

    let cart = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({userId, items: []})
    } 

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId);

    if(itemIndex > -1){
        const item = cart.items[itemIndex]
        
        if(item.qty > qty){
            const pricePerQty = cart.items[itemIndex].price/cart.items[itemIndex].qty
            cart.items[itemIndex].qty -= qty;
            cart.items[itemIndex].price = pricePerQty * cart.items[itemIndex].qty 
        }else{
            cart.items.splice(itemIndex, 1);
        }              
    }else{
        res.json({message : "No Product found in the Cart"})
    }
    await cart.save();

    return res.json({message: "Item Removed.", cart, success: true});
}