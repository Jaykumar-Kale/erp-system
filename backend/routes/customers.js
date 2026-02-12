const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAllCustomers)
  .post(authorize('admin', 'manager'), createCustomer);

router.route('/:id')
  .get(getCustomer)
  .put(authorize('admin', 'manager'), updateCustomer)
  .delete(authorize('admin'), deleteCustomer);

module.exports = router;
