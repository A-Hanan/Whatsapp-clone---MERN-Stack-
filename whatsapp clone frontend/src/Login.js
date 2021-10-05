import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
          alt="WHATSAPP"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
