# Pratilipi StoryBook

## Stack - MERN

This Web application showcases the Authentication and Story/Blogs

Core Features:
### Currently Viewing

How currentlyViewing is calculated ?

When the user requests the resource for a story,
we deletes the certain items in the currentlyviewing array (stored in db) which are below certain timestamps (say 5 min)
then we add the new date and userinfo.
```
{ date:Date.now(), userId: ...}
```

We store userId to handle the edge cases like the same person opening he webpage on another tab or on another device.

Cons:
This is not realtime.
- But given the fact that users barely spend 7 minutes
  in a blog, we can trade that with this logic, It depends on situation to choose the logic.

#### Other Options to consider:

#### Sockets (TCP connection)
Pros:

- Its realtime
- No db writes for currently viewing.

Cons:

- Using In-Memory such as

```
const currentlyViewing = {
  [storyId_here_]: [{userId,date}] //array
};
```

will result in race conditions if there are many connects and disconnects since all the connections share the same data.

### Total Read Count

How total readcounts are calculated ?

- we have viewers field in model.
- It would have unique items of visitors.
- We will check if the requested user is present or not
- if not add the item and increase the readcount else do nothing
