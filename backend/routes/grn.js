const express = require('express');
const router = express.Router();
const {
  getGRNs,
  getGRN,
  createGRN,
  updateGRN,
  deleteGRN,
  getGRNsByPO
} = require('../controllers/grnController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getGRNs)
  .post(authorize('admin', 'manager'), createGRN);

router.route('/:id')
  .get(getGRN)
  .put(authorize('admin', 'manager'), updateGRN)
  .delete(authorize('admin'), deleteGRN);

router.get('/purchase-order/:poId', getGRNsByPO);

module.exports = router;
