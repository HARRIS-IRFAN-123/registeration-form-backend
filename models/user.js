
import mongoose from "mongoose";
import becrypt from "bcrypt"
const {Schema} = mongoose;
const userSchema = new Schema({
 name:{
    type : String,
    trim : true,
    require : "Name is required"
 },
 email : {
    type : String,
    trim : true,
    require : "Email is required"
 },
 password : {
    type : String,
    require : true,
    min : 6,
    max : 64,
 },
 
 address: {
    type: String,
    trim: true,
},
smaster: {
    type: String,
    trim: true,
},
program: {
    type: String,
    trim: true,
},
course: {
    type: String,
    trim: true,
},
phonenumber: {
    type: String,
    trim: true,
},
college: {
    type: String,
    trim: true,
},
university: {
    type: String,
    trim:true
},
 stripe_account_id :'',
 stripe_seller:{},
 stripeSession : {},
 
},
    {timestamps : true} 
);
userSchema.pre('save', function(next) {
   let user = this;
   if(user.isModified('password')){
   return becrypt.hash(user.password, 8, function(err,hash){
      if(err){
         console.log("Becrypt has error", err);
         return next(err);
      }
      user.password = hash;
      return next();
   });
   }else{
      return next()
   }
});
userSchema.methods.comparePassword = function(password,next){
becrypt.compare(password,this.password, function(err,match){
if(err){
console.log('Compare Password ERR',err)
return next(err,false)
}
console.log("Match Password",match);
return next(null,match)
})
}

export default mongoose.model("User",userSchema);