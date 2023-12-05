import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true,
  },

});

const User = mongoose.model("users", userSchema);
export default User