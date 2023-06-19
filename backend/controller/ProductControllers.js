const ProductModal = require("../models/ProductModal");
const ErrorHandling = require("../utils/errorHandling");
const AsyncError = require("../middleware/AsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
const UserModal = require("../models/UserModal");
const EmailSender = require("../utils/EmailSend");
const OrderModal = require("../models/OrderModla");
const OrderConfirmEmail = require("../utils/orderconfirmMail");
const date = require("date-and-time");
const OTPverification = require("../utils/OtpVerfication");

//Get All Product ->  /api/v1/products
exports.GetAllProducts = AsyncError(async (req, res, next) => {
  let resperpage = 3
  let Apifeatures = new ApiFeatures(ProductModal.find(),req.query).search().category().filter().pagenation(resperpage)
  const products = await Apifeatures.query;

  const totalCount = await ProductModal.countDocuments({})

  res.status(200).json({
    success: true,
    count: resperpage,
    totalCount,
    products
  });
});

//Create Products -> /api/v1/product/create
exports.CreateProduct = AsyncError(async (req, res, next) => {

  let images = [];

  let BASE_URL = process.env.BACKEND_URL

  if(process.env.NODE_ENV === "production"){
    BASE_URL = `${req.protocol}://${req.get("host")}`
  }

  if(req.files.length > 0){
    req.files.forEach((file)=>{
      let url = `${BASE_URL}/uploads/products/${file.originalname}`
      images.push({image:url})
    })
  }

  req.body.images = images

  req.body.user = req.user.id
  const product = await ProductModal.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});
//Get Single Product -> /api/v1/product/:id

exports.GetSingleProduct = AsyncError(async (req, res, next) => {
  const product = await ProductModal.findById(req.params.id);

  //Check Product id is Correct
  if (!product) {
    return next(new ErrorHandling("Product Not Found", 401));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update Product -> /api/v1/product/update

exports.UpdateProduct = AsyncError(async (req, res, next) => {
  let product = await ProductModal.findById(req.params.id);


  console.log(req.body);

  //Check Product id is Correct
  if (!product) {
    return res.status(401).json({
      success: false,
      message: "product Id dose not match",
    });
  }

  req.body.images = product.images

  product = await ProductModal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product Controller -> api/v1/product/:id

exports.DeleteProductCon = AsyncError(async (req, res, next) => {
  const product = await ProductModal.findById(req.params.id);

  //Check Product id is Correct
  if (!product) {
    return res.status(401).json({
      success: false,
      message: "product Id dose not match",
    });
  }

  await ProductModal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Deleted SuccessFully",
  });
});

//Create product review -> api/v1/product/review
exports.CreateProductReview = AsyncError(async (req,res,next)=>{
  const {productId,comments,rating} = req.body;

  const user = await UserModal.findById(req.user.id)

  const reviews = {
    user:user.id,
    name:user.name,
    rating,
    comments
  }
  const product = await ProductModal.findById(productId);



  const isReview = product.reviews.find(rewiew=>{
    return rewiew.user.toString() === reviews.user.toString()
  })
  if(isReview){
    product.reviews.forEach((review)=>{
      if(review.user.toString() === reviews.user.toString()){
        review.comments = comments,
        review.rating = rating
      }
    })
  }else{
    product.reviews.push(reviews)
    product.numOfReviews = product.reviews.length
  }


  const avrageRating = product.reviews.reduce((acc,rewiew)=>{
    return rewiew.rating + acc
  },0)/product.reviews.length;

  const averageRating = isNaN(avrageRating)?0:avrageRating;

  console.log(averageRating);
  product.rating = averageRating;
  await product.save({validateBeforeSave:false})

  res.status(200).json({
    success:true,
    product
  })
})

//Get All rewiews -> product/all/reviews

exports.GetAllProductReviews = AsyncError(async (req,res,next)=>{
  const product = await ProductModal.findById(req.query.id);

  res.status(200).json({
    success:true,
    reviews: product.reviews
  })
})

//Admin:Delete Product Reviews -> product/delete/review

exports.AdminDeleteProductReviews = AsyncError(async (req,res,next)=>{
  const product = await ProductModal.findById(req.query.product);

  const rewiews = product.reviews.filter((rewiew)=>{
    return rewiew._id.toString() !== req.query.id 
  })


  const numOfReviews = rewiews.length;

  let rating = rewiews.reduce((acc,rewiew)=>{
    return rewiew.rating + acc
  },0)/rewiews.length;

  rating = isNaN(rating)?0:rating

  product.reviews = rewiews;
  product.rating = rating;
  product.numOfReviews = numOfReviews;
  await product.save({validateBeforeSave:false})

  res.status(200).json({
    success:true,
    product
  })
})

//Home Section Products Details

exports.HomeSectionDetails = AsyncError(async (req,res,next)=>{


  const newProduct = await ProductModal.find().sort({createdAt:-1}).limit(4);
  const topSelling = await ProductModal.find().sort({numOfProductBuyCount :-1}).limit(4);

  res.status(200).json({
    success:true,
    newProduct,
    topSelling

  })
})

//Get All Admin Products -> api/v1/all/products
exports.GetAllAdminPoducts = AsyncError(async (req,res,next)=>{

  const products = await ProductModal.find()
  const productCount = await ProductModal.countDocuments({});
  const outofstock = products.filter((product)=>product.stock <= 0).length
  res.status(200).json({
    success:true,
    products,
    productCount,
    outofstock
  })
})

//Text Mail Send

exports.TexMail = AsyncError(async (req,res,next)=>{

  // OTPverification({name:"Ajai Kumar",otp:938476,email:"swat51301@gmail.com"})

  res.status(200).render("auth",{name:"Ajai Kumar",otp:678456})
})