const mongoose = require('mongoose');

const SalesOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Please add a customer']
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank_transfer', 'cheque'],
    default: 'cash'
  },
  deliveryDate: {
    type: Date
  },
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate order number
SalesOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `SO-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Reduce product inventory when order is created
SalesOrderSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  const Customer = mongoose.model('Customer');
  
  // Update inventory
  for (const item of this.items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { quantity: -item.quantity } }
    );
  }
  
  // Update customer balance
  await Customer.findByIdAndUpdate(
    this.customer,
    { $inc: { outstandingBalance: this.total } }
  );
});

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);
