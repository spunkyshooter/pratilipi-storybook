import Story from "../../Models/Story";

/*

*/
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate({ path: "author", select: "name" })
      .exec();
    return res.status(200).send(stories);
  } catch (err) {
    console.log("** GetAllStories error **\n", err);
    return res
      .status(500)
      .json({ err: "Bad Request", message: "Internal Server Error" });
  }
};

export default getAllStories;
