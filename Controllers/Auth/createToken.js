import jwt from "jsonwebtoken";

/*Creates the jwt token asynchronously */
const createToken = async (payload, SECRET) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      //sign return type is void, hence not thenable or do await
      payload,
      SECRET,
      {
        // algorithm: "RS256", //Is producing error
        expiresIn: "24h", //300s
      },
      (err, token) => {
        if (err) {
          return reject("jwt error");
        }
        return resolve(token);
      }
    );
  });

export default createToken;
