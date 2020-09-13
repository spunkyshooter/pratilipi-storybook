import React from "react";
import Input from "Components/Input";
import InfoBox from "Components/InfoBox";
import useCancellablePromise from "Hooks/useCancellablePromise.js";
import { toast } from "react-toastify";
import authStyles from "Styles/auth.module.scss";
import NavBar from "Components/Navbar";
import registerImg from "assets/registerImg.webp";
import loginImg from "assets/login.webp";
import Spinner from "Components/Spinner";
import api from "Api";
import PATHS from "AppRouter/paths.json";

import {
  registerSchema,
  loginSchema,
  validatePassword,
} from "utils/formValidate.js";
import { useHistory } from "react-router-dom";

const defaultState = {
  register: {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    isRegister: true,
  },
  login: {
    username: "",
    password: "",
    isRegister: false,
  },
};

const defaultUtilsState = {
  hitValidated: false,
  checked: false,
  loading: false,
  usernameAvailable: null,
};
const defaultErrors = {
  formError: "",
  inputError: {
    // email: true, //dynamic
    message: "", //ex: email is a required field
  },
};
const Auth = () => {
  const history = useHistory();
  const [state, setState] = React.useState(defaultState["register"]);
  const isRegister = state.isRegister;
  //companion state
  const [utilsState, setUtilsState] = React.useState(defaultUtilsState);
  //error state
  const [error, setError] = React.useState(defaultErrors);
  //custom hook
  const { cancellablePromise } = useCancellablePromise();
  //acts as a static variable. //accessed by .current prop
  const checkUserNameTimeoutId = React.useRef();

  React.useEffect(() => {
    //initally when submit btn is not clicked.
    //after hitting a submit btn, yup validation kicks in hence empty cases will be handled
    let validPass = true;

    if (state.password !== "" && !validatePassword(state.password)) {
      validPass = false;
      setError((state) => ({
        ...state,
        inputError: { password: true, message: "" },
      })); //mesage is not used
    }
    if (validPass) {
      //works if password is empty or,
      // if pass turns valid from invalid
      setError((state) => ({
        ...state,
        inputError: {
          // email: true, //dynamic
          message: "", //ex: email is a required field
        },
      }));
    }
    if (
      !utilsState.hitValidated &&
      state.confirmPassword &&
      state.password !== ""
    ) {
      handleErrors(state);
    }

    if (!utilsState.hitValidated) return;
    handleErrors(state);
  }, [utilsState.hitValidated, state]);

  //only for username and register case
  //functionality: checks whether username already exists or not.
  React.useEffect(() => {
    if (!isRegister) return;
    if (isRegister && state.username === "") return;
    if (checkUserNameTimeoutId.current)
      clearTimeout(checkUserNameTimeoutId.current);
    checkUserNameTimeoutId.current = setTimeout(async () => {
      try {
        const resp = await fetch(api.checkUsername, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: state.username }),
        });
        const data = await resp.json();
        if (data.userExists) {
          setError((state) => ({
            ...state,
            inputError: {
              username: data.userExists,
              message: "Username already exists.",
            },
          })); //mesage is not used
        } else {
          setUtilsState((prevState) => {
            return { ...prevState, usernameAvailable: true };
          });
        }
      } catch (err) {
        console.log(err);
      }
    }, 750);
  }, [state.username]);

  const handleErrors = async (entries) => {
    let shouldSendReq = true;
    let inputError = {};

    try {
      //vaidating as per the schema
      const schema = isRegister ? registerSchema : loginSchema; //if login
      await schema.validate(entries);
    } catch (err) {
      // console.log(err);
      shouldSendReq = false;
      inputError[err.params.path] = true; //this sould be ex: password:true
      inputError.message = err.message;
    }
    setError((state) => ({
      formError: state.formError,
      inputError,
    }));
    return shouldSendReq;
  };
  const sendRequest = async () => {
    const url = isRegister ? api.register : api.login;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await resp.json();
    return data;
  };

  const onChangeHandler = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUtilsState((state) => ({ ...state, hitValidated: true, loading: true }));
    const shouldSendReq = await handleErrors(state);
    if (!shouldSendReq) {
      setUtilsState((state) => ({ ...state, loading: false }));
      return;
    }

    try {
      let data = await cancellablePromise(sendRequest());
      //DO set state thingy here, (because if the promise gets cancels (rejects), then it
      //will raise error and go to catch block
      if (data.err) {
        setError((state) => ({
          formError: data.err,
          inputError: state.inputError,
        }));
        setUtilsState((state) => ({ ...state, loading: false }));
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        history.push(PATHS.blogs);
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal Server  Error!");
    } finally {
    }
  };

  const toggleAuthHandlr = () => {
    setState((state) => {
      const name = state.isRegister ? "login" : "register";
      return defaultState[name];
    });
    setUtilsState(defaultUtilsState);
    setError(defaultErrors);
  };
  return (
    <div className="lg:h-screen">
      <NavBar
        nameInAuth={isRegister ? "Login" : "Register"}
        onClickHandler={toggleAuthHandlr}
      />
      <div className="flex h-full">
        <div className="hidden lg:block w-1/2">
          <img
            src={isRegister ? registerImg : loginImg}
            alt="prapitili image"
            className={!isRegister ? "mt-12 mx-auto" : "mx-auto"}
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pt-12 pt-12 md:pt-0">
          <p
            className={`text-primary text-center font-black font-ubt form-wrapper-title text-2xl
              `}
          >
            {isRegister ? "Register" : "Login"}&nbsp;
          </p>
          {/* Form */}
          {error.formError !== "" && ( //top level error box
            <InfoBox
              text={error.formError}
              isError={true}
              className="text-center"
            />
          )}
          <form
            className={`mx-auto ${authStyles.form_wrapper}`}
            onSubmit={submitHandler}
          >
            {isRegister && (
              <Input
                id="auth_name"
                label="Name"
                name="name"
                type="text"
                placeholder="Bob..."
                wrprClsName={authStyles.auth_input_wrapper}
                onChange={onChangeHandler}
                ComponentBelowInput={
                  <InfoBox
                    isError={error.inputError.name}
                    text={error.inputError.name && error.inputError.message}
                  />
                }
              />
            )}
            <Input
              id="auth_username"
              label="UserName"
              name="username"
              type="text"
              placeholder="Bob18..."
              wrprClsName={authStyles.auth_input_wrapper}
              autoComplete="username"
              onChange={onChangeHandler}
              isInvalid={error.inputError.username}
              ComponentBelowInput={
                error.inputError.username ? (
                  <InfoBox isError={true} text={error.inputError.message} />
                ) : utilsState.usernameAvailable ? (
                  <InfoBox
                    isError={false}
                    text="Username is available"
                    color="#00bd00"
                  />
                ) : null
              }
            />
            <Input
              id="auth_password"
              label="Password"
              name="password"
              type="password"
              placeholder="***"
              isInvalid={error.inputError.password}
              onChange={onChangeHandler}
              autoComplete={isRegister ? "new-password" : "current-password"}
              wrprClsName={authStyles.auth_input_wrapper}
              ComponentBelowInput={
                isRegister && (
                  <InfoBox
                    isError={error.inputError.password}
                    text="passwords should be atleast 8 characters with combination of uppercase, lowercase and symbols"
                  />
                )
              }
              minLength="8"
            />
            {isRegister && (
              <Input
                id="auth_confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="***"
                isInvalid={error.inputError.confirmPassword}
                onChange={onChangeHandler}
                autoComplete={isRegister ? "new-password" : "current-password"}
                wrprClsName={authStyles.auth_input_wrapper}
                ComponentBelowInput={
                  <InfoBox
                    isError={error.inputError.confirmPassword}
                    text={
                      error.inputError.confirmPassword
                        ? error.inputError.message
                        : "passwords should be atleast 8 characters with combination of uppercase, lowercase and symbols"
                    }
                  />
                }
                minLength="8"
              />
            )}
            <button
              disabled={utilsState.loading}
              className="btn-bg-variant block mx-auto px-16 mt-4"
              style={{
                opacity: utilsState.loading ? "0.8" : "1",
                cursor: "pointer",
              }}
            >
              {utilsState.loading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
