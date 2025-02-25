import { createPost, getAllPosts, likePost } from "../models/post.js";

// Get feed posts
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const query = "SELECT * FROM posts WHERE userId = $1;";
    const { rows } = await pool.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user posts" });
  }
};

// Like a post
export const likePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const updatedPost = await likePost(id, userId);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error updating like" });
  }
};
