"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postscontroller_1 = require("../controllers/postscontroller");
const router = (0, express_1.Router)();
router.route('/')
    .get(postscontroller_1.getPosts)
    .post(postscontroller_1.createPost);
router.route('/:postId')
    .get(postscontroller_1.getPost)
    .delete(postscontroller_1.deletePost)
    .put(postscontroller_1.updatePost);
exports.default = router;
