import pool from "../databasepg.js";
  // PostgreSQL database connection

// Create a new post
export const createPost = async (postData) => {
  const {
    userId, firstName, lastName, location, description,
    picturePath, userPicturePath, likes, comments
  } = postData;

  const query = `
    INSERT INTO posts (userId, firstName, lastName, location, description, 
      picturePath, userPicturePath, likes, comments) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *;
  `;

  const values = [
    userId, firstName, lastName, location, description,
    picturePath, userPicturePath, JSON.stringify(likes), comments
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the created post
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_at DESC;");
    return rows;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Like a post (update likes)
export const likePost = async (postId, userId) => {
  try {
    const { rows } = await pool.query("SELECT likes FROM posts WHERE id = $1", [postId]);
    let likes = rows[0].likes || {};

    // Toggle like
    if (likes[userId]) {
      delete likes[userId]; // Unlike
    } else {
      likes[userId] = true; // Like
    }

    await pool.query("UPDATE posts SET likes = $1 WHERE id = $2", [JSON.stringify(likes), postId]);
    return { message: "Like updated successfully" };
  } catch (error) {
    console.error("Error updating likes:", error);
    throw error;
  }
};
