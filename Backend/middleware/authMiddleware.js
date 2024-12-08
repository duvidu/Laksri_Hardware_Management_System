// authMiddleware.js

const UserModel = require('../models/userregmodel');

// const extractUserId = async (req, res, next) => {
//     try {
//         // Assuming you have a field like 'userId' in the request body or headers after authentication
//         const userId = req.body.userId; // Adjust this based on how you obtain the user ID
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         req.userId = userId; // Add userId to request object
//         next();
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// module.exports = { extractUserId };

// const extractUserId = async (req, res, next) => {
//     try {
//         // Assuming you obtain the user ID from the authentication token
//         const userId = req.cookies.userId; // Adjust this based on how you store the user ID in the request object
//         if (!userId) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         req.userId = userId; // Add userId to request object
//         next();
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const extractUserId = async (req, res, next) => {
    try {
        const userId = req.cookies.userId;
        console.log('Retrieved userId from cookies:', userId); // Retrieve user ID from cookies
        console.log(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.userId = userId; // Add userId to request object
        next();
    } catch (error) {
        console.error('Error extracting userId:', error);
        res.status(400).json({ error: error.message });
    }
};
module.exports = { extractUserId };