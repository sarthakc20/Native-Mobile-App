const express = require("express");
const { createPostController, getPostController, getUserPostController } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");

// routes object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POSTS || GET
router.get("/get-posts", getPostController);

// GET USER POSTS || GET
router.get("/get-user-posts", requireSignIn, getUserPostController );

//export
module.exports = router;
