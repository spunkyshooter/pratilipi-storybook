import Story from "../../Models/Story";

const getStoryBySlug = async (req, res) => {
  const user = req.user;
  try {
    let story = await Story.findOne({ slug: req.params.slug }).exec();
    story = story.toObject(); //Converts from Mongoose Document Type to plain js Object
    //Hence we can mutate the properties.
    if (!story) {
      throw new Error("No such story exists");
    }
    // console.log(story);
    const isuserPresent = isVisitorPresent(story.visitors, user.id);
    if (!isuserPresent) {
      //for faster response we do this operation inmemory and send this before update.
      story.readCount++;
    }
    const updatedCurrView = getUpdatedCurrentlyViewing(
      story.currentlyViewing,
      user.id
    );

    //preprocess before sending
    story.currentlyViewing = updatedCurrView.length;
    delete story.visitors; //removing the array before response.
    // console.log(story);
    //Just don't return now itself, first serve the request
    res.status(200).send(story);
    //Now we update the db with the latest changes.

    const updateQuery = {
      currentlyViewing: updatedCurrView,
    };

    /*By this additional check we update only if required, Also reduces the size of the request */
    if (!isuserPresent) {
      updateQuery.$push = { visitors: user.id };
      updateQuery.readCount = story.readCount; //its already updated
    }

    await Story.findByIdAndUpdate(story._id, updateQuery).exec(); //updateQuery
    return;
  } catch (err) {
    console.log("**story req err**\n", err);
    if (err === "No such story exists")
      return res.status(404).json({ error: err });
    else return res.status(500).send({ error: "Internal Server error" });
  }
};

//returns bool if the visitor is present
const isVisitorPresent = (visitorsArr = [], userId) => {
  for (const visitorId of visitorsArr) {
    if (visitorId === userId) {
      return true;
    }
  }
  return false;
};

/*To handle a continuously refreshes, or opening in other tab, we need userId
  We remove the item, if userId matches or date is below the threshold of 5 min
  Then we add the new Item with {userId ,  new date}

@param: currentlyViewing : [{userId,date}]
 */
const getUpdatedCurrentlyViewing = (currentlyViewing = [], userId) => {
  const newDate = new Date();
  const past5min =
    newDate.getTime() - newDate.setMinutes(newDate.getMinutes() - 5);
  const UpdatedCurrView = currentlyViewing.filter((item, _) => {
    if (`${item.userId}` !== userId && new Date(item.date).getTime() > past5min)
      return true;
    return false;
  });
  UpdatedCurrView.push({ userId, date: newDate });

  return UpdatedCurrView;
};
export default getStoryBySlug;

/*

How currentlyViewing is calculated ?
  When the user requests the resource for a story,
  we deletes the certain items in the array which are below certain timestamps
  then we add the new date.

This is not realtime.
  - But given the fact that users barely spend 7 minutes
    in a blog, we can trade that with this logic

Cons:
  - There would be frequent db writes in case 1000 people opening the same article)


How total readcounts are calculated ?
  we have viewers field in model.
  It would have unique items of visitors.
  We will check if the requested user is present or not
  if not add the item and increase the readcount
  else do nothing



Sockets for currently viewing ?

Pros:
- Its realtime
- No db writes for currently viewing.

Cons:
- Using In-Memory such as
const currentlyViewing = {
  [storyId_here_]: [{userId,date}] //array
};
will result in race conditions if there are many connects and disconnects
Since all the connections share the same data.

*/
