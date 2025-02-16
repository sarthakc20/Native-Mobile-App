const express = require("express");
const { createPostController, getPostController, getUserPostController, deletePostController, updatePostController } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");

// routes object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POSTS || GET
router.get("/get-posts", getPostController);

// GET USER POSTS || GET
router.get("/get-user-posts", requireSignIn, getUserPostController );

// DELETE POST || DELETE
router.delete("/delete-post/:id", requireSignIn, deletePostController );

// UPDATE POST || PUT
router.put("/update-post/:id", requireSignIn, updatePostController );

//export
module.exports = router;
