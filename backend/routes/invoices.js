const express = require('express');
const router = express.Router();
const {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  recordPayment,
  deleteInvoice
} = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAllInvoices)
  .post(authorize('admin', 'manager'), createInvoice);

router.route('/:id')
  .get(getInvoice)
  .put(authorize('admin', 'manager'), updateInvoice)
  .delete(authorize('admin'), deleteInvoice);

router.patch('/:id/payment', authorize('admin', 'manager'), recordPayment);

module.exports = router;
