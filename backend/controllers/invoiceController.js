const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const SalesOrder = require('../models/SalesOrder');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
exports.getAllInvoices = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const invoices = await Invoice.find(query)
      .populate('customer', 'name email phone company')
      .populate('order', 'orderNumber')
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customer')
      .populate('order')
      .populate('createdBy', 'name email');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice',
      error: error.message
    });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
exports.createInvoice = async (req, res) => {
  try {
    const { customer, order, items, tax, discount, dueDate, notes, paymentMethod } = req.body;

    // Calculate totals
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.total;
    });

    const total = subtotal + (tax || 0) - (discount || 0);
    const dueAmount = total;

    const invoice = await Invoice.create({
      customer,
      order,
      items,
      subtotal,
      tax: tax || 0,
      discount: discount || 0,
      total,
      dueAmount,
      dueDate,
      notes,
      paymentMethod,
      createdBy: req.user.id
    });

    // Update order payment status if linked
    if (order) {
      await SalesOrder.findByIdAndUpdate(order, {
        paymentStatus: 'pending'
      });
    }

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate('customer')
      .populate('order');

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: populatedInvoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message
    });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('customer').populate('order');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating invoice',
      error: error.message
    });
  }
};

// @desc    Record payment for invoice
// @route   PATCH /api/invoices/:id/payment
// @access  Private
exports.recordPayment = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;

    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    if (amount > invoice.dueAmount) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount exceeds due amount'
      });
    }

    invoice.paidAmount += amount;
    invoice.dueAmount -= amount;
    
    if (invoice.dueAmount === 0) {
      invoice.status = 'paid';
      
      // Update order payment status if linked
      if (invoice.order) {
        await SalesOrder.findByIdAndUpdate(invoice.order, {
          paymentStatus: 'paid'
        });
      }
      
      // Update customer outstanding balance
      await Customer.findByIdAndUpdate(invoice.customer, {
        $inc: { outstandingBalance: -invoice.total }
      });
    } else {
      invoice.status = 'sent';
      
      if (invoice.order) {
        await SalesOrder.findByIdAndUpdate(invoice.order, {
          paymentStatus: 'partial'
        });
      }
    }

    if (paymentMethod) {
      invoice.paymentMethod = paymentMethod;
    }

    await invoice.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording payment',
      error: error.message
    });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private/Admin
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting invoice',
      error: error.message
    });
  }
};
