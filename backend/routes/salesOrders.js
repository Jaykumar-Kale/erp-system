const express = require('express');
const router = express.Router();
const {
  getSalesOrders,
  getSalesOrder,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder
} = require('../controllers/salesOrderController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getSalesOrders)
  .post(createSalesOrder);

router.route('/:id')
  .get(getSalesOrder)
  .put(updateSalesOrder)
  .delete(authorize('admin', 'manager'), deleteSalesOrder);

module.exports = router;
