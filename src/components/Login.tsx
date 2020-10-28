import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";

export const Login = () => {
  const [loginOptions, setLoginOptions] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation({
    update: (store, { data }) => {
      if (data?.login.accessToken) {
        localStorage.setItem("authorization", data.login.accessToken);
        localStorage.removeItem("credentials");
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem("credentials")) {
      setLoginOptions(localStorage.getItem("credentials") as any);
    }
  }, []);

  return (
    <div>
      {localStorage.getItem("authorization") ? <Redirect to="/" /> : null}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={(e) =>
            setLoginOptions({
              ...loginOptions,
              [e.target.name]: e.target.value,
            })
          }
          name="email"
          placeholder="email"
        />
        <input
          onChange={(e) =>
            setLoginOptions({
              ...loginOptions,
              [e.target.name]: e.target.value,
            })
          }
          name="password"
          placeholder="password"
          type="password"
        />
        <button onClick={() => login({ variables: loginOptions })}>
          Login
        </button>
      </form>
    </div>
  );
};
