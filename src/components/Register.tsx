import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useCreateUserMutation } from "../generated/graphql";

export const Register = () => {
  const [registerOptions, setRegisterOptions] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [createUser, { error }] = useCreateUserMutation({
    update: (store, { data }) => {
      if (data?.createUser === true) {
        localStorage.setItem("credentials", JSON.stringify(registerOptions));
      }
    },
  });
  return (
    <div>
      {localStorage.getItem("credentials") ? <Redirect to="/login" /> : null}
      <form
        style={{
          display: "grid",
          gridTemplateRows: "repeat(1, 1fr)",
          width: "50%",
          marginLeft: "25%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={(e) =>
            setRegisterOptions({
              ...registerOptions,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="Name"
          name="name"
        />
        <input
          onChange={(e) =>
            setRegisterOptions({
              ...registerOptions,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="Email"
          name="email"
        />
        <input
          onChange={(e) =>
            setRegisterOptions({
              ...registerOptions,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="passsword"
          type="password"
          name="password"
        />
        <button
          type="submit"
          onClick={() => createUser({ variables: registerOptions })}
        >
          Register account
        </button>
      </form>
      {<p>{error?.message}</p>}
    </div>
  );
};
