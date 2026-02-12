const PurchaseOrder = require('../models/PurchaseOrder');

// @desc    Get all purchase orders
// @route   GET /api/purchase-orders
// @access  Private
exports.getPurchaseOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.orderNumber = { $regex: search, $options: 'i' };
    }
    
    const purchaseOrders = await PurchaseOrder.find(query)
      .populate('supplier', 'name company')
      .populate('items.product', 'name sku')
      .populate('createdBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await PurchaseOrder.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: purchaseOrders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single purchase order
// @route   GET /api/purchase-orders/:id
// @access  Private
exports.getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id)
      .populate('supplier')
      .populate('items.product')
      .populate('createdBy', 'name email');
    
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    
    res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new purchase order
// @route   POST /api/purchase-orders
// @access  Private (Admin, Purchase)
exports.createPurchaseOrder = async (req, res) => {
  try {
    const { supplier, items, tax, discount, paymentTerms, expectedDeliveryDate, notes } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.quantity * item.price;
    }
    
    const total = subtotal + (tax || 0) - (discount || 0);
    
    const purchaseOrder = await PurchaseOrder.create({
      supplier,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentTerms,
      expectedDeliveryDate,
      notes,
      createdBy: req.user._id
    });
    
    res.status(201).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update purchase order
// @route   PUT /api/purchase-orders/:id
// @access  Private (Admin, Purchase)
exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('supplier').populate('items.product');
    
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    
    res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete purchase order
// @route   DELETE /api/purchase-orders/:id
// @access  Private (Admin)
exports.deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    
    // Only allow deletion if status is pending
    if (purchaseOrder.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete purchase order that is not pending' 
      });
    }
    
    await purchaseOrder.deleteOne();
    
    res.status(200).json({ success: true, message: 'Purchase order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve purchase order
// @route   PUT /api/purchase-orders/:id/approve
// @access  Private (Admin, Purchase Manager)
exports.approvePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).populate('supplier').populate('items.product');
    
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    
    res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
