import { string, object, oneOf, ref } from "yup";

const minPassLength = 8;
const validatePassword = (password) => {
  const strongRegex = new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${minPassLength},})`
  );
  return strongRegex.test(password); //true of false
  // const mediumRegex = new RegExp(
  //   "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  // );
  // if (strongRegex.test(password)) return "strong";
  // else if (mediumRegex.test(password)) return "medium";
  // else return "poor";
};

const registerSchema = object().shape({
  name: string().required(),
  username: string().required(),
  password: string()
    .required()
    .min(minPassLength)
    .test("Strong", "${path} is not Strong", (value) =>
      validatePassword(value)
    ),
  confirmPassword: string().required().oneOf(
    [ref("password"), null],
    "Passwords don't match"
  ),
});

const loginSchema = object().shape({
  username: string().required("UserName is required."),
  password: string().min(minPassLength),
});

export { registerSchema, loginSchema, validatePassword };
