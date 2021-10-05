import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import axios from "./axios";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, room, id }) => {
  const [seed, setSeed] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  useEffect(() => {
    let messages = [];
    axios.get("/messages/sync").then((response) => {
      messages = response.data;
    });

    setTimeout(() => {
      setRoomMessages(messages.filter((message) => message.room_id === id));
    }, 1000);
  }, [room]);
  const createChat = async (e) => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      //do som eclever database stuff
      e.preventDefault();

      await axios.post("/rooms/new", {
        name: roomName,
      });
    }
  };
  console.log("roomMessages >>>", roomMessages);
  const setScreen = () => {
    const sidebar = document.getElementById("sidebar");
    const chat = document.getElementById("chat");
    sidebar.classList.add("hide");
    setTimeout(() => {
      chat.classList.remove("hide");
    }, 2000);
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat" onClick={setScreen}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{room}</h2>
          <p>{roomMessages[roomMessages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
