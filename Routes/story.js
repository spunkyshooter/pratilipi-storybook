import express from "express";
import { StoryController } from "../Controllers";
import { isAuth } from "../Middlewares";
/*Base route: /api/story */

const router = express.Router();

router.post("/", isAuth, StoryController.createStory);
router.get("/", isAuth, StoryController.getAllStories);
router.get("/:slug", isAuth, StoryController.getStoryBySlug);
router.get("/author/:authorId", StoryController.getStoriesOfAuthor);


export default router;
