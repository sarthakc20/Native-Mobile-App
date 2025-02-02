const express = require("express");
const { createPostController, getPostController } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");

// routes object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// GET POSTS || GET
router.get("/get-posts", getPostController);

//export
module.exports = router;
