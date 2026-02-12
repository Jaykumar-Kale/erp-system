const mongoose = require('mongoose');

const GRNSchema = new mongoose.Schema({
  grnNumber: {
    type: String,
    unique: true,
    required: true
  },
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseOrder',
    required: [true, 'Please link to a purchase order']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  receivedItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    orderedQuantity: {
      type: Number,
      required: true
    },
    receivedQuantity: {
      type: Number,
      required: true
    },
    acceptedQuantity: {
      type: Number,
      required: true
    },
    rejectedQuantity: {
      type: Number,
      default: 0
    },
    remarks: String
  }],
  receiptDate: {
    type: Date,
    default: Date.now
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['partial', 'complete', 'pending_inspection'],
    default: 'complete'
  },
  inspectionNotes: String,
  attachments: [String]
}, {
  timestamps: true
});

// Auto-generate GRN number
GRNSchema.pre('save', async function(next) {
  if (!this.grnNumber) {
    const count = await this.constructor.countDocuments();
    this.grnNumber = `GRN-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Update product stock when GRN is created
GRNSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  
  for (const item of this.receivedItems) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { quantity: item.acceptedQuantity } }
    );
  }
});

module.exports = mongoose.model('GRN', GRNSchema);
