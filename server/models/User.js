import mongoose from "mongoose";
                                              //first object
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturepath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
   {timestamps: true}
  );           //for automatic dates i.e when its created or updated etc

  const User = mongoose.model("user", UserSchema);
  export default User;