import User from "../../Models/User";

const checkUsername = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ err: "username is empty" });
  }

  try {
    const user = await User.findOne({ username }).exec();
    return res.status(200).json({ userExists: user !== null });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

export default checkUsername;
