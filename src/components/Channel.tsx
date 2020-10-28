import React, { useEffect, useRef, useState } from "react";
import { match } from "react-router-dom";
import { setTimeout } from "timers";
import {
  GetServerDocument,
  GetServerQuery,
  Message,
  useGetMessagesQuery,
  useGetMessagesSubSubscription,
  User,
  useSendMessageMutation,
} from "../generated/graphql";
import { useStore } from "../store/store";

interface Props {
  initialMessages:
    | ({
        __typename?: "Message" | undefined;
      } & Pick<Message, "channelId" | "body" | "createdAt"> & {
          user: {
            __typename?: "User" | undefined;
          } & Pick<User, "name">;
        })[]
    | undefined;
  idParam: string;
  channelName: string | undefined;
}

export const Channel: React.FC<Props> = ({
  initialMessages,
  idParam,
  channelName,
}) => {
  const selectedChannel = useStore((state) => state.selectedChannel);
  const messageRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const { data } = useGetMessagesSubSubscription({
    variables: {
      channelId: selectedChannel as string,
    },
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      const query: GetServerQuery | null = client.readQuery({
        query: GetServerDocument,
        variables: {
          id: idParam,
        },
      });
      console.log(data?.getMessage);
      const newData = {
        messages: [...(query as any).getServer.messages, data?.getMessage],
      };
      console.log(query, newData);
      client.writeQuery({
        query: GetServerDocument,
        data: {
          getServer: {
            messages: newData.messages,
          },
        },
        variables: {
          id: idParam,
        },
      });
      (messageRef as any).current.scrollTop = messageRef.current?.scrollHeight;
    },
  });

  const [sendMessage] = useSendMessageMutation({
    context: { headers: { token: localStorage.getItem("authorization") } },
  });

  useEffect(() => {
    (messageRef as any).current.scrollTop = messageRef.current?.scrollHeight;
  }, [selectedChannel]);

  useEffect(() => {
    setTimeout(() => {
      (messageRef as any).current.scrollTop = messageRef.current?.scrollHeight;
    }, 500);
  }, [data]);
  return (
    <div>
      <div style={{ backgroundColor: "#3F0E40" }}>
        <h2 style={{ color: "white" }}>{channelName}</h2>
      </div>
      <div
        ref={messageRef}
        style={{
          overflowY: "scroll",
          height: "40rem",
          width: "100%",
          border: "1px solid grey",
          backgroundColor: "white",
        }}
      >
        {initialMessages?.map((message) => (
          <div style={{ color: "#5B5A5B" }}>
            <p
              style={{
                fontSize: "12px",
              }}
            >
              <strong style={{ marginRight: "0.5rem" }}>
                {message.user.name}
              </strong>
              {new Date(message.createdAt).toDateString()}
            </p>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
      <form
        style={{ width: "100%", backgroundColor: "#E8F5FB", height: "10rem" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          placeholder={`Message #${channelName}`}
          onChange={(e) => setText(e.target.value)}
          value={text}
          rows={6}
          style={{
            width: "99.7%",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "transparent",
            outline: "none",
            resize: "none",
          }}
        />
        <div>
          <button
            style={{
              width: "10%",
              backgroundColor: "#007A5A",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              color: "white",
              boxShadow:
                "0 5px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            }}
            onClick={() => {
              sendMessage({
                variables: {
                  channelId: selectedChannel as string,
                  message: text,
                },
              });
              setText("");
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
