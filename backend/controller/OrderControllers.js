const { default: mongoose } = require("mongoose");
const AsyncError = require("../middleware/AsyncError");
const OrderModal = require("../models/OrderModla");
const ProductModal = require("../models/ProductModal");
const UserModal = require("../models/UserModal");
const ErrorHandling = require("../utils/errorHandling");
const OrderConfirmEmail = require("../utils/orderconfirmMail");

//Create Order -> api/v1/create/order

exports.CreateOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    razorpay_payment_id,
  } = req.body;


  const orders = await OrderModal.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paymentId: razorpay_payment_id,
    paidAt: Date.now(),
  })
  const user = await UserModal.findById(req.user.id);

  user.userOrders.push({ orderId: orders.id });
  await user.save({ validateBeforeSave: false });

  orders.orderItems.forEach(async (item) => {
    const product = await ProductModal.findById(item.productId.toString());
    if (!product) {
      return await next(new ErrorHandling("Product Not Found", 401));
    }

    product.stock = product.stock - item.quantity;
    product.numOfProductBuyCount = product.numOfProductBuyCount + item.quantity;
    await product.save({ validateBeforeSave: false });
  });


  let BASE_URL = process.env.FRONT_END_URL

  if(process.env.NODE_ENV === "production"){
    BASE_URL = `${req.protocol}://${req.get("host")}`
  }



  const order = await OrderModal.findById(orders.id).lean().populate("user","name email")

  console.log(order);

  const link = `${BASE_URL}/user/single/order/${order._id}`

  OrderConfirmEmail({order,link})

  res.status(200).json({
    success: true,
    orderId:order._id,
  });
});

//Get single order -> api/v1/single/order/:id

exports.GetSingleOrder = AsyncError(async (req, res, next) => {
  const order = await OrderModal.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandling("Order Not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get user ALl orders -> api/v1/all/orders

exports.GetUserAllOrders = AsyncError(async (req, res, next) => {
  let order = await OrderModal.find({ user: req.user.id }).populate("orderItems.productId",'reviews');

  
  if (!order) {
    return next(new ErrorHandling("No such Order found", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Stock is Available -> api/v1/product/stock
exports.isStockIsAvailable = AsyncError(async (req, res, next) => {
  const { cartItems } = req.body;

  const productsIds = cartItems.map((item)=>{return item.productId})
  const products = await ProductModal.find({
    _id: {
      $in: productsIds,
    },
  });

  const stock = products.find((product)=>{
     if(Number(product.stock) <= 0){
        return true
    }
  })

  if(stock){
    return next(new ErrorHandling(`Sorry the ${stock.name} is out of stock`))
  }else{
  res.status(200).json({
    success: true,
  });
}
});

//Admin Update order -> api/v1/admin/update/order/:id

exports.AdminUpdateOrder = AsyncError(async (req, res, next) => {
  const order = await OrderModal.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandling("No such Order Found", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandling("Product Already Delivered", 400));
  }

  if (!req.body.orderStatus) {
    return next(new ErrorHandling("Please select the OrderStatus", 400));
  }

  order.orderStatus = req.body.orderStatus;
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status updated",
  });
});

//Admin Delete order -> api/v1/admin/order/delete/:id
exports.AdminDeleteOrder = AsyncError(async (req, res, next) => {
  const order = await OrderModal.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandling("Product not Found", 400));
  }

  if (order.orderStatus !== "Delivered") {
    return next(new ErrorHandling("Product dose not Delivered", 400));
  }

  await OrderModal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});


//DashBoard Admin ROute -> api/v1/dashboard

exports.DashboardDetails = AsyncError(async (req,res,next)=>{
  const user = await UserModal.countDocuments({});
  let order = await OrderModal.find();
  let stock = await ProductModal.find();

  stock = stock.filter((sto)=>sto.stock === 0).length;
  let totalEarnings = order.reduce((pre,ord)=>(pre + ord.itemsPrice),0)
 let penOrder = order.filter((ord)=>ord.orderStatus !== "Delivered").length

  res.status(200).json({
    success:true,
    user,
    penOrder,
    order,
    stock,
    totalEarnings
  })
})

//Orders Page details -> api/v1/admin/order

exports.AdminOrderDetails = AsyncError(async (req,res,next)=>{

  const totalOrders = await OrderModal.countDocuments({});
  const orders = await OrderModal.find();

  const penOrders = orders.filter((order)=> order.orderStatus !== "Delivered").length;
  const delOrders = orders.filter((order)=> order.orderStatus === "Delivered").length;
  const penOrdersList = orders.filter((order)=> order.orderStatus !== "Delivered");

  const newOrders = orders.filter((order)=>(new Date(order.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000)).length;

  res.status(200).json({
    success:true,
    totalOrders,
    penOrders,
    delOrders,
    penOrdersList,
    newOrders
  })
})