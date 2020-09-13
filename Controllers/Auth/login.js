import brcypt from "bcryptjs";
import config from "../../config";
import createToken from "./createToken";
import User from "../../Models/User";

/*
body expects {username, password}
1. If any information is missing, it rejects with 400
2. we find the user in db, then if we matches the password (we hash it first and compare)
3. If it is matched then it returns token and user info in response.
4. Else rejects with 400
*/
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ err: "Some fields are empty!" });
  }
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(400).json({ err: "User doesn't exists" });
    }
    //compare the password
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ err: "One or the other fields are invalid!" });
    }

    //generate the token
    const userPayload = {
      username,
      name: user.name,
      id: user.id,
    };
    const token = await createToken(userPayload, config.jwtSecret);
    return res.status(200).json({
      user: userPayload,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

export default login;
