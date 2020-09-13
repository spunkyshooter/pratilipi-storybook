import Story from "../../Models/Story";

/*
@properties in req.params
authorId: ObjectId of author
*/
const getStoriesOfAuthor = async (req, res) => {
  const { authorId } = req.params;
  if (!authorId) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "authorId can't be empty" });
  }
  try {
    const stories = await Story.find({ author: authorId }).exec();
    return res.status(200).send(stories);
  } catch (err) {
    console.log("** GetStoriesofAuthor error **");
    return res
      .status(500)
      .json({ error: "Bad Request", message: "Internal Server Error" });
  }
};

export default getStoriesOfAuthor;
