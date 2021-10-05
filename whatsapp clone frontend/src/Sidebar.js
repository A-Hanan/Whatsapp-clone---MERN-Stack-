import React from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

const Sidebar = ({ rooms }) => {
  {
    /*console.log(rooms);*/
  }
  const [{ user }, dispatch] = useStateValue();
  //console.log(user);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="Search or start new chat" type="text"></input>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat room={room.name} key={room._id} id={room._id} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
