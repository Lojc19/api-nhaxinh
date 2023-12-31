const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minlength: 6,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        minlength: 10,
        maxlength: 10,
        required:true,
        unique: true,
    },
    role:{
        type:String,
        required:true,
        default: "customer",
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    otpResetPassword: String,
    passwordResetExpires: Date,
}, {
    collection: "users",
    timestamps: true,
}
);

userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
};
userSchema.methods.createOTPResetPassword = async function () {
    const otpResetPassword = Math.floor(100000 + Math.random() * 900000); // Số ngẫu nhiên 6 chữ số
    this.otpResetPassword = otpResetPassword.toString();
    this.passwordResetExpires = Date.now() + 5 * 60 * 1000; // 5 phút
  
    return otpResetPassword;
  };


//Export the model
module.exports = mongoose.model('User', userSchema);