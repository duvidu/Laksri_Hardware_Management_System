const { getAllReturnItems,
    getOneReturnItem,
    createReturnItem,
    updateReturnItem,
    deleteReturnItem } = require('../../controllers/SupplyManagement/returnItemsController');

const express = require('express')

router = express.Router()


router.route('/').post(createReturnItem).get(getAllReturnItems)
router.route('/:id').get(getOneReturnItem)
router.route('/:id').patch(updateReturnItem)
router.route('/:id').delete(deleteReturnItem)


module.exports = router