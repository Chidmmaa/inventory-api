const express = require('express');
const { createInventory, getAllInventory, deleteInventory} = require('../controller/inventoryController');

const router = express.Router();

router.post('/inventory', createInventory);
router.get('/inventory', getAllInventory);
router.delete('/inventory/:product_number', deleteInventory);

module.exports = router;