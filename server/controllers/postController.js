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
        postedBy: req.auth._id
    }).save();
    res.status(201).send({
        sucess: true,
        message: "Post created successfully",
        post
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

module.exports = { createPostController };
