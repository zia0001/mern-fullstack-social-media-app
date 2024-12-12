import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,     // user profile image
    likes: {
      type: Map,                 // we check if the user id exist in this map and the value is gonna be true always if it exists. means if you like it you will be add to this map

      of: Boolean,                              //value of

    },

    comments: {
      type: Array,
      default: [],
    }

  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;