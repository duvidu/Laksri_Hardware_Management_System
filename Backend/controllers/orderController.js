const Order = require('../models/orderModules');

const createOrder = async (req, res) => {
    try {
        const { carts, totalPrice } = req.body;
        const order = new Order({
            carts,
            totalPrice
        });
        await order.save();
        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order', error });
    }
};



const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'carts',
            populate: {
                path: 'cartItems.product',
                model: 'newInventory' 
            }
        });
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
    }
};



module.exports = { createOrder, getOrders};
