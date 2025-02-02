const postModel = require("../models/postModel");

//Create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // validation
    if (!title || !description) {
      return res.status(500).send({
        sucess: false,
        message: "Please provide all fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      sucess: true,
      message: "Post created successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      sucess: false,
      message: "Error creating post api",
      error,
    });
  }
};

// Get Posts
const getPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Posts data retrieved successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error while getting posts",
      error,
    });
  }
};

module.exports = { createPostController, getPostController };
