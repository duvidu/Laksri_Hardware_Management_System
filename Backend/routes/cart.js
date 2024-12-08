const express = require('express');

const { addToCart,getCartById,getAllCarts,updateCart,deleteCartItem, clearCart   } = require('../controllers/cartController');

const router = express.Router();


router.post('/',addToCart);


router.get('/:cartId', getCartById);

router.get('/', getAllCarts); 

router.patch('/update', updateCart);

router.delete('/:cartId/remove/:productId', deleteCartItem);

router.delete('/clear', clearCart);

module.exports = router;
