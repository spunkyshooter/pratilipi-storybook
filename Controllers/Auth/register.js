import bcrypt from "bcryptjs";
import createToken from "./createToken";
import config from "../../config";
import User from "../../Models/User";

/*
body expects { name,username,password }
1. Validates the information and sends 400 if something is missing
2. If user already exits then send status 406 (Not acceptable)
3. Else generates the hashpassword and save the entry to the database.
  And return token and user info in the response.
*/
const register = async (req, res) => {
  const { name, username, password } = req.body;
  //validation
  if (!name || !username || !password) {
    return res.status(400).send({ err: "Empty fields" });
  }
  //check if user is present
  const user = await User.findOne({ username }).exec();
  if (user) {
    return res.status(406).send({ err: "User already exists" });
  }
  //Else register user
  //generate hased password
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    if (user) {
      //gen token and send
      const userPayload = {
        username,
        name,
        id: user.id,
      };
      const token = await createToken(userPayload, config.jwtSecret);
      return res.status(200).json({
        user: userPayload,
        token: token,
      });
    } else {
      throw new Error("Error");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err || "Internal Server Error");
  }
};

export default register;
