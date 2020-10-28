import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetServerQuery } from "../generated/graphql";
import { useStore } from "../store/store";
import { Channel } from "./Channel";
import "../Channel.css";

export const Server = (props: any) => {
  const { data, loading, error } = useGetServerQuery({
    context: {
      headers: {
        token: localStorage.getItem("authorization"),
      },
    },
    variables: {
      id: props.match.params.id,
    },
    onCompleted: (data) => {
      selectChannel(data.getServer.channels[0].id);
    },
  });

  const selectedChannel = useStore((state) => state.selectedChannel);
  const selectChannel = useStore((state) => state.selectChannel);

  return (
    <div>
      <div>{loading ? <p>...loading</p> : null}</div>
      <div>{error ? <p>{error.message}</p> : null}</div>
      <Link to="/">
        <button>Go back to servers</button>
      </Link>
      <div style={{ backgroundColor: "#3F0E40" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>
          {data?.getServer.server.name}
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
        <div
          style={{
            width: "15%",
            backgroundColor: "#3F0E40",
          }}
        >
          <h1>Channels</h1>

          {data?.getServer.channels.map((channel) => {
            return (
              <div
                onClick={() => selectChannel(channel.id)}
                style={{
                  backgroundColor:
                    channel.id === selectedChannel ? `#1164A3` : "transparent",
                  color: "#AA94AA",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  height: "2rem",
                }}
              >
                <h5> # {channel.name}</h5>
              </div>
            );
          })}
        </div>
        {loading ? (
          <p>...loading</p>
        ) : (
          <div style={{ width: "75%" }}>
            <Channel
              idParam={props.match.params.id}
              initialMessages={data?.getServer.messages.filter(
                (message) => message.channelId === selectedChannel
              )}
              channelName={
                data?.getServer.channels.find(
                  (channel) => channel.id === selectedChannel
                )?.name
              }
            />
          </div>
        )}

        <div>
          <h1>Members</h1>
          {data?.getMembersInServer.map((user) => {
            return (
              <div style={{ marginLeft: "5%", marginBottom: "10%" }}>
                <h4>{user.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
