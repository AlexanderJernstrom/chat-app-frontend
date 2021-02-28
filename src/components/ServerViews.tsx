import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetServersQuery,
  useCreateServerMutation,
} from "../generated/graphql";

export const ServerViews = () => {
  const { data, error, loading } = useGetServersQuery({
    context: { headers: { token: localStorage.getItem("authorization") } },
  });

  const [createServer] = useCreateServerMutation({
    context: { headers: { token: localStorage.getItem("authorization") } },
  });
  const [text, setText] = useState("");

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Chatify</h1>
      <h2 style={{ marginLeft: "1rem" }}>Your servers</h2>
      <div
        style={{
          width: "50%",
          boxShadow:
            "0 5px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#203A4C",
          display: "flex",
          justifyContent: "center",
          marginLeft: "25%",
        }}
      >
        {data?.getServers.map((server) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              backgroundColor: "#264A63",
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
              boxShadow:
                "0 5px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Link
              to={`/server/${server.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              {server.name}
            </Link>
          </div>
        ))}
      </div>
      <input
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "white",
        }}
        onChange={(e) => setText(e.target.value)}
        placeholder="Name of server"
      />
      <button
        onClick={() => {
          createServer({ variables: { name: text } });
        }}
      >
        Create a new server
      </button>
    </div>
  );
};
