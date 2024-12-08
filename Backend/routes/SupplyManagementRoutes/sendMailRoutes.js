const { sendLowStocksMail, sendReturnItemsMail } = require('../../controllers/SupplyManagement/sendMailController')


const express = require('express')

router = express.Router()

router.route('/low-stocks').post(sendLowStocksMail);
router.route('/return-items').post(sendReturnItemsMail);

module.exports = router