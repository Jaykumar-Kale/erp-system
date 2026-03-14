const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../models/User');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Supplier = require('../models/Supplier');
const SalesOrder = require('../models/SalesOrder');
const Invoice = require('../models/Invoice');

dotenv.config({ path: require('path').join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_system';

const usersData = [
  {
    name: 'ERP Admin',
    email: 'admin@erp.com',
    password: 'Admin@123',
    role: 'admin',
    phone: '9876543210',
    department: 'Management',
    status: 'active'
  },
  {
    name: 'Sales Manager',
    email: 'manager@erp.com',
    password: 'Manager@123',
    role: 'manager',
    phone: '9876543211',
    department: 'Sales',
    status: 'active'
  },
  {
    name: 'Store Employee',
    email: 'employee@erp.com',
    password: 'Employee@123',
    role: 'employee',
    phone: '9876543212',
    department: 'Inventory',
    status: 'active'
  }
];

const suppliersData = [
  {
    name: 'Ramesh Traders',
    email: 'ramesh.traders@example.com',
    phone: '9001001001',
    company: 'Ramesh Traders Pvt Ltd',
    address: { city: 'Pune', state: 'Maharashtra', country: 'India' },
    gstNumber: '27ABCDE1234F1Z5',
    productCategories: ['Electronics', 'Accessories'],
    paymentTerms: 'Net 30',
    status: 'active',
    rating: 4
  },
  {
    name: 'Shree Supply',
    email: 'shree.supply@example.com',
    phone: '9001001002',
    company: 'Shree Supply Co',
    address: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    gstNumber: '27PQRSX5678L1Z2',
    productCategories: ['Furniture', 'Office'],
    paymentTerms: 'Net 15',
    status: 'active',
    rating: 5
  }
];

const customersData = [
  {
    name: 'Aarav Enterprises',
    email: 'aarav@example.com',
    phone: '9011101101',
    company: 'Aarav Enterprises',
    address: { city: 'Nashik', state: 'Maharashtra', country: 'India' },
    gstNumber: '27LMNOP9876A1Z9',
    creditLimit: 200000,
    status: 'active'
  },
  {
    name: 'Delta Retail',
    email: 'delta@example.com',
    phone: '9011101102',
    company: 'Delta Retail LLP',
    address: { city: 'Aurangabad', state: 'Maharashtra', country: 'India' },
    gstNumber: '27WXYZT4321K1Z3',
    creditLimit: 150000,
    status: 'active'
  }
];

const productTemplates = [
  {
    name: 'Dell Latitude 3440',
    sku: 'LAP-1001',
    description: 'Business laptop, 16GB RAM, 512GB SSD',
    category: 'Electronics',
    price: 62000,
    costPrice: 56000,
    quantity: 40,
    minStockLevel: 8,
    reorderLevel: 12,
    unit: 'pcs',
    status: 'active'
  },
  {
    name: 'Logitech Wireless Mouse',
    sku: 'ACC-2001',
    description: '2.4GHz wireless office mouse',
    category: 'Accessories',
    price: 900,
    costPrice: 650,
    quantity: 200,
    minStockLevel: 25,
    reorderLevel: 40,
    unit: 'pcs',
    status: 'active'
  },
  {
    name: 'Ergonomic Office Chair',
    sku: 'FUR-3001',
    description: 'Adjustable lumbar support office chair',
    category: 'Furniture',
    price: 8500,
    costPrice: 6500,
    quantity: 60,
    minStockLevel: 10,
    reorderLevel: 15,
    unit: 'pcs',
    status: 'active'
  },
  {
    name: 'A4 Copier Paper (500 sheets)',
    sku: 'OFF-4001',
    description: '80 GSM A4 copier paper',
    category: 'Office',
    price: 280,
    costPrice: 210,
    quantity: 500,
    minStockLevel: 80,
    reorderLevel: 120,
    unit: 'pcs',
    status: 'active'
  }
];

async function upsertUsers() {
  const result = [];

  for (const userData of usersData) {
    const existingUser = await User.findOne({ email: userData.email }).select('+password');

    if (existingUser) {
      existingUser.name = userData.name;
      existingUser.role = userData.role;
      existingUser.phone = userData.phone;
      existingUser.department = userData.department;
      existingUser.status = userData.status;
      if (userData.password) {
        existingUser.password = userData.password;
      }
      await existingUser.save();
      result.push(existingUser);
      continue;
    }

    const createdUser = await User.create(userData);
    result.push(createdUser);
  }

  return result;
}

async function upsertSuppliers(adminId) {
  const result = [];

  for (const supplierData of suppliersData) {
    const supplier = await Supplier.findOneAndUpdate(
      { email: supplierData.email },
      { ...supplierData, createdBy: adminId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    result.push(supplier);
  }

  return result;
}

async function upsertCustomers(adminId) {
  const result = [];

  for (const customerData of customersData) {
    const customer = await Customer.findOneAndUpdate(
      { email: customerData.email },
      { ...customerData, createdBy: adminId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    result.push(customer);
  }

  return result;
}

async function upsertProducts(adminId, suppliers) {
  const result = [];

  for (let i = 0; i < productTemplates.length; i += 1) {
    const template = productTemplates[i];
    const supplier = suppliers[i % suppliers.length];

    const product = await Product.findOneAndUpdate(
      { sku: template.sku },
      { ...template, supplier: supplier._id, createdBy: adminId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    result.push(product);
  }

  return result;
}

async function createDemoSalesOrders({ adminId, customers, products }) {
  const existingInvoiceCount = await Invoice.countDocuments();
  let invoiceSequence = existingInvoiceCount + 1;

  const orderDefinitions = [
    {
      orderNumber: 'SO-SEED-00001',
      customer: customers[0]._id,
      items: [
        { product: products[0]._id, quantity: 2, price: products[0].price },
        { product: products[1]._id, quantity: 10, price: products[1].price }
      ],
      tax: 2500,
      discount: 1000,
      paymentMethod: 'bank_transfer',
      status: 'processing'
    },
    {
      orderNumber: 'SO-SEED-00002',
      customer: customers[1]._id,
      items: [
        { product: products[2]._id, quantity: 3, price: products[2].price },
        { product: products[3]._id, quantity: 25, price: products[3].price }
      ],
      tax: 900,
      discount: 300,
      paymentMethod: 'upi',
      status: 'pending'
    }
  ];

  for (const definition of orderDefinitions) {
    const subtotal = definition.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const total = subtotal + definition.tax - definition.discount;

    let order = await SalesOrder.findOne({ orderNumber: definition.orderNumber });

    if (!order) {
      order = await SalesOrder.create({
        orderNumber: definition.orderNumber,
        customer: definition.customer,
        items: definition.items,
        subtotal,
        tax: definition.tax,
        discount: definition.discount,
        total,
        paymentMethod: definition.paymentMethod,
        status: definition.status,
        deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        notes: 'Seeded sample sales order',
        createdBy: adminId
      });
    }

    const invoiceExists = await Invoice.exists({ order: order._id });
    if (!invoiceExists) {
      await Invoice.create({
        invoiceNumber: `INV-SEED-${String(invoiceSequence).padStart(5, '0')}`,
        customer: order.customer,
        order: order._id,
        items: order.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        discount: order.discount,
        total: order.total,
        dueAmount: order.total,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        paymentMethod: order.paymentMethod,
        status: 'sent',
        notes: 'Seeded sample invoice',
        createdBy: adminId
      });
      invoiceSequence += 1;
    }
  }

  const ordersWithoutInvoices = await SalesOrder.find().lean();
  for (const order of ordersWithoutInvoices) {
    const invoiceExists = await Invoice.exists({ order: order._id });
    if (invoiceExists) {
      continue;
    }

    await Invoice.create({
      invoiceNumber: `INV-SEED-${String(invoiceSequence).padStart(5, '0')}`,
      customer: order.customer,
      order: order._id,
      items: order.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price
      })),
      subtotal: order.subtotal,
      tax: order.tax,
      discount: order.discount,
      total: order.total,
      dueAmount: Math.max(order.total, 0),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      paymentMethod: order.paymentMethod,
      status: 'sent',
      notes: 'Seeded invoice for existing order',
      createdBy: adminId
    });

    invoiceSequence += 1;
  }
}

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);

    const users = await upsertUsers();
    const adminUser = users.find((u) => u.role === 'admin') || users[0];

    const suppliers = await upsertSuppliers(adminUser._id);
    const customers = await upsertCustomers(adminUser._id);
    const products = await upsertProducts(adminUser._id, suppliers);

    await createDemoSalesOrders({
      adminId: adminUser._id,
      customers,
      products
    });

    const counts = await Promise.all([
      User.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
      Product.countDocuments(),
      SalesOrder.countDocuments(),
      Invoice.countDocuments()
    ]);

    console.log('\nSeed complete. Current counts:');
    console.log(`Users: ${counts[0]}`);
    console.log(`Suppliers: ${counts[1]}`);
    console.log(`Customers: ${counts[2]}`);
    console.log(`Products: ${counts[3]}`);
    console.log(`Sales Orders: ${counts[4]}`);
    console.log(`Invoices: ${counts[5]}`);

    console.log('\nDemo login credentials:');
    console.log('Admin: admin@erp.com / Admin@123');
    console.log('Manager: manager@erp.com / Manager@123');
    console.log('Employee: employee@erp.com / Employee@123');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
