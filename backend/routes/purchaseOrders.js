const express = require('express');
const router = express.Router();
const {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  approvePurchaseOrder
} = require('../controllers/purchaseOrderController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getPurchaseOrders)
  .post(authorize('admin', 'manager'), createPurchaseOrder);

router.route('/:id')
  .get(getPurchaseOrder)
  .put(authorize('admin', 'manager'), updatePurchaseOrder)
  .delete(authorize('admin'), deletePurchaseOrder);

router.put('/:id/approve', authorize('admin', 'manager'), approvePurchaseOrder);

module.exports = router;
