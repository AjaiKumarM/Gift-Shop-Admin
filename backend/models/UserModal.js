const mongosee = require("mongoose");
const validator = require("email-validator");
const bycrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

const UserScema = new mongosee.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter the Email Id"],
    unique: [true, "Email id Already Register"],
    lowercase: true,
    trim: true,
    validate: [validator.validate, "Please Enter the Valid Email id"],
  },
  password: {
    type: String,
    required: [true, "Please enter the Password"],
    minLength: [6, "Password should be atleast 6 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  userOrders: [
    {
      orderId: mongoose.Schema.Types.ObjectId,
    },
  ],
  shippingInfo: [
    {
      address: {
        type: String,
      },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      phoneNo: {
        type: Number,
      },
      postalCode: {
        type: Number,
      },
      fullName: {
        type: String,
      },
      emailId: {
        type: String,
        lowercase: true,
        trim: true,
        validate: [validator.validate, "Please Enter the Valid Email id"],
      },
    },
  ],
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Save Password Hash  String
UserScema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrypt.hash(this.password, 10);
});

//Generate Json Web Token
UserScema.methods.GetJwtToken = function () {
  return Jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//Compare User Password is Correct
UserScema.methods.getValidPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

//Get Reset Password Token
UserScema.methods.getResetToken = function () {
  const tokrn = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(tokrn)
    .digest("hex");
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return tokrn;
};

const UserModal = mongosee.model("userdetails", UserScema);

module.exports = UserModal;
