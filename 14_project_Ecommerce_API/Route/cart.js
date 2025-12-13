import express from 'express'
import { addProductToCart, clearCartForUserID, decreaseProductQty, getCart, removeProductFromCart } from '../controllers/cart.js';
import { isAuthenticated } from '../Middleware/auth.js';


const router = express.Router();

// @api - /api/cart/add
// desc:- add items to cart
router.post('/add', isAuthenticated, addProductToCart)

router.get('/getCart', isAuthenticated, getCart)

router.delete('/remove/:productId', isAuthenticated, removeProductFromCart);

router.delete('/clear', isAuthenticated, clearCartForUserID);

router.post('/decreaseQty', isAuthenticated, decreaseProductQty);

export default router;