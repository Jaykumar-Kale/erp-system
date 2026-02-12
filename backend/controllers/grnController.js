const GRN = require('../models/GRN');
const PurchaseOrder = require('../models/PurchaseOrder');

// @desc    Get all GRNs
// @route   GET /api/grn
// @access  Private
exports.getGRNs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.grnNumber = { $regex: search, $options: 'i' };
    }
    
    const grns = await GRN.find(query)
      .populate('purchaseOrder')
      .populate('supplier', 'name company')
      .populate('receivedItems.product', 'name sku')
      .populate('receivedBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await GRN.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: grns,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single GRN
// @route   GET /api/grn/:id
// @access  Private
exports.getGRN = async (req, res) => {
  try {
    const grn = await GRN.findById(req.params.id)
      .populate('purchaseOrder')
      .populate('supplier')
      .populate('receivedItems.product')
      .populate('receivedBy', 'name email');
    
    if (!grn) {
      return res.status(404).json({ success: false, message: 'GRN not found' });
    }
    
    res.status(200).json({ success: true, data: grn });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new GRN
// @route   POST /api/grn
// @access  Private (Admin, Inventory)
exports.createGRN = async (req, res) => {
  try {
    const { purchaseOrder, supplier, receivedItems, inspectionNotes, attachments } = req.body;
    
    // Verify purchase order exists and is approved
    const po = await PurchaseOrder.findById(purchaseOrder);
    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    
    if (po.status !== 'approved') {
      return res.status(400).json({ 
        success: false, 
        message: 'Purchase order must be approved before creating GRN' 
      });
    }
    
    // Calculate status based on received quantities
    let status = 'complete';
    for (const item of receivedItems) {
      if (item.receivedQuantity < item.orderedQuantity) {
        status = 'partial';
        break;
      }
    }
    
    const grn = await GRN.create({
      purchaseOrder,
      supplier,
      receivedItems,
      status,
      inspectionNotes,
      attachments,
      receivedBy: req.user._id
    });
    
    // Update purchase order status
    await PurchaseOrder.findByIdAndUpdate(purchaseOrder, { status: 'received' });
    
    res.status(201).json({ success: true, data: grn });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update GRN
// @route   PUT /api/grn/:id
// @access  Private (Admin, Inventory)
exports.updateGRN = async (req, res) => {
  try {
    const grn = await GRN.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('purchaseOrder').populate('supplier').populate('receivedItems.product');
    
    if (!grn) {
      return res.status(404).json({ success: false, message: 'GRN not found' });
    }
    
    res.status(200).json({ success: true, data: grn });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete GRN
// @route   DELETE /api/grn/:id
// @access  Private (Admin)
exports.deleteGRN = async (req, res) => {
  try {
    const grn = await GRN.findById(req.params.id);
    
    if (!grn) {
      return res.status(404).json({ success: false, message: 'GRN not found' });
    }
    
    await grn.deleteOne();
    
    res.status(200).json({ success: true, message: 'GRN deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get GRNs by Purchase Order
// @route   GET /api/grn/purchase-order/:poId
// @access  Private
exports.getGRNsByPO = async (req, res) => {
  try {
    const grns = await GRN.find({ purchaseOrder: req.params.poId })
      .populate('supplier', 'name company')
      .populate('receivedItems.product', 'name sku')
      .populate('receivedBy', 'name')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: grns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
