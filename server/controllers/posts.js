import Post from "../models/post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturepath } = req.body;     //picture of post image
    const user = await user.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturepath,
      picturepath,
      likes: {},
      comment: []
    })
    await newPost.save();

    const post = await Post.find();   // this is grabbing all the posts
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

/* READ */

export const getFeedPosts = async (req, res) => {  // This is grab all the posts of everyone like a newsfeed for user
  try {

    const post = await Post.find();   // this is grabbing all the posts
    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });   // this is grabbing all the posts
    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;  // userId comes from the body of the request i.e from the request body of front end
    const post = await Post.findById(id); // grabbing the post information
    const isliked = post.likes.get(userId); // here we are checking in the 'likes' if the user id exists if it is exists it means that post has been liked by that particular person

    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await post.findByIdAndUpdate(   // updating front end
      id,
      { likes: post.likes },     // the list of likes that we modified 
      { new: true }

    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}




