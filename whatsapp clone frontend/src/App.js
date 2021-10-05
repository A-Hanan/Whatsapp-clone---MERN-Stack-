import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  //const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
    //retrieving rooms data from db
    axios.get("/rooms/sync").then((response) => {
      setRooms(response.data);
    });
  }, []);
  useEffect(() => {
    var pusher = new Pusher("a832b2c1f90495003fb0", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    var channel2 = pusher.subscribe("rooms");
    channel2.bind("inserted", (newRoom) => {
      //alert(JSON.stringify(newRoom));
      setRooms([...rooms, newRoom]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      channel2.unbind_all();
      channel2.unsubscribe();
    };
  }, [messages, rooms]);

  // console.log("messages>>>> ", messages);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar rooms={rooms} />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} />
              </Route>

              <Route path="/">{/* Chat */}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
