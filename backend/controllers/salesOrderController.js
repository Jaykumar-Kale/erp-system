const SalesOrder = require('../models/SalesOrder');

// @desc    Get all sales orders
// @route   GET /api/sales-orders
// @access  Private
exports.getSalesOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.orderNumber = { $regex: search, $options: 'i' };
    }
    
    const salesOrders = await SalesOrder.find(query)
      .populate('customer', 'name email company')
      .populate('items.product', 'name sku price')
      .populate('createdBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await SalesOrder.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: salesOrders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single sales order
// @route   GET /api/sales-orders/:id
// @access  Private
exports.getSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id)
      .populate('customer')
      .populate('items.product')
      .populate('createdBy', 'name email');
    
    if (!salesOrder) {
      return res.status(404).json({ success: false, message: 'Sales order not found' });
    }
    
    res.status(200).json({ success: true, data: salesOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new sales order
// @route   POST /api/sales-orders
// @access  Private
exports.createSalesOrder = async (req, res) => {
  try {
    const { customer, items, tax, discount, paymentMethod, deliveryDate, notes } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.quantity * item.price;
    }
    
    const total = subtotal + (tax || 0) - (discount || 0);
    
    const salesOrder = await SalesOrder.create({
      customer,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      deliveryDate,
      notes,
      createdBy: req.user._id
    });
    
    res.status(201).json({ success: true, data: salesOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update sales order
// @route   PUT /api/sales-orders/:id
// @access  Private
exports.updateSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('customer').populate('items.product');
    
    if (!salesOrder) {
      return res.status(404).json({ success: false, message: 'Sales order not found' });
    }
    
    res.status(200).json({ success: true, data: salesOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete sales order
// @route   DELETE /api/sales-orders/:id
// @access  Private (Admin)
exports.deleteSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id);
    
    if (!salesOrder) {
      return res.status(404).json({ success: false, message: 'Sales order not found' });
    }
    
    await salesOrder.deleteOne();
    
    res.status(200).json({ success: true, message: 'Sales order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
