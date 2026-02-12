const User = require('../models/User');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Supplier = require('../models/Supplier');
const SalesOrder = require('../models/SalesOrder');
const Invoice = require('../models/Invoice');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalProducts = await Product.countDocuments({ status: 'active' });
    const totalCustomers = await Customer.countDocuments({ status: 'active' });
    const totalSuppliers = await Supplier.countDocuments({ status: 'active' });
    const totalOrders = await SalesOrder.countDocuments();
    const pendingOrders = await SalesOrder.countDocuments({ status: 'pending' });
    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: 'paid' });
    const pendingInvoices = await Invoice.countDocuments({ status: { $in: ['draft', 'sent'] } });

    // Get low stock products
    const lowStockProducts = await Product.find({
      status: 'active',
      $expr: { $lte: ['$quantity', '$minStockLevel'] }
    }).limit(5);

    // Calculate revenue (from paid invoices)
    const revenueData = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Calculate pending payments
    const pendingPaymentsData = await Invoice.aggregate([
      { $match: { status: { $in: ['draft', 'sent', 'overdue'] } } },
      { $group: { _id: null, totalPending: { $sum: '$dueAmount' } } }
    ]);
    const pendingPayments = pendingPaymentsData.length > 0 ? pendingPaymentsData[0].totalPending : 0;

    // Get recent orders
    const recentOrders = await SalesOrder.find()
      .populate('customer', 'name company')
      .sort('-createdAt')
      .limit(5);

    // Get recent invoices
    const recentInvoices = await Invoice.find()
      .populate('customer', 'name company')
      .sort('-createdAt')
      .limit(5);

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Invoice.aggregate([
      {
        $match: {
          status: 'paid',
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalCustomers,
          totalSuppliers,
          totalOrders,
          pendingOrders,
          totalInvoices,
          paidInvoices,
          pendingInvoices,
          totalRevenue,
          pendingPayments
        },
        lowStockProducts,
        recentOrders,
        recentInvoices,
        monthlyRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// @desc    Get sales analytics
// @route   GET /api/dashboard/analytics
// @access  Private
exports.getSalesAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }

    // Sales by status
    const salesByStatus = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          total: { $sum: '$total' }
        }
      }
    ]);

    // Top selling products
    const topProducts = await Order.aggregate([
      { $match: dateFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productName',
          quantitySold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 }
    ]);

    // Top customers
    const topCustomers = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$customer',
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customerInfo'
        }
      },
      { $unwind: '$customerInfo' }
    ]);

    res.status(200).json({
      success: true,
      data: {
        salesByStatus,
        topProducts,
        topCustomers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales analytics',
      error: error.message
    });
  }
};
