import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFile from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "./axios";
import { useParams } from "react-router";
import { useStateValue } from "./StateProvider";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [specificMessages, setSpecificMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      axios
        .get("/rooms/sync")
        .then((res) => res.data)
        .then((rooms) => {
          rooms.forEach((room) => {
            if (room._id === roomId) {
              setRoomName(room.name);
              setSpecificMessages(
                messages.filter((message) => message.room_id == roomId)
              );
            }
          });
        });
    }
  }, [roomId, specificMessages]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = async (e) => {
    e.preventDefault();
    // console.log(input);

    await axios.post("/messages/new", {
      message: input,
      name: user?.displayName,
      timestamp: new Date().toUTCString(),
      received: true,
      room_id: roomId,
    });

    setInput("");
  };
  const setScreen = () => {
    const sidebar = document.getElementById("sidebar");
    const chat = document.getElementById("chat");
    chat.classList.add("hide");
    sidebar.classList.remove("hide");
  };

  return (
    <div className="chat hide" id="chat">
      {/******************************** */}
      <div className="chat__header">
        <span onClick={setScreen} className="arrow__back">
          <ArrowBackIcon />
        </span>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {specificMessages[specificMessages.length - 1]?.timestamp}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/******************************** */}
      <div className="chat__body">
        {specificMessages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      {/******************************** */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
