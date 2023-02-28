//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "appId(your own)",
  key: "apiKey(your own)",
  secret: "secretKey(your Own)",
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
//could also use cors instead
app.use(cors());

//DB config
const connection_url =
  "mongoURI(your own)";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
});

//onecting database with pusher for making real time app
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
        room_id: messageDetails.room_id,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
  const roomCollection = db.collection("roomscontents");
  const changeStream2 = roomCollection.watch();

  changeStream2.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        name: roomDetails.name,
        _id: roomDetails._id,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

//???

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created : ${data}`);
    }
  });
});

app.get("/rooms/sync", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/rooms/new", (req, res) => {
  const dbRoom = req.body;

  Rooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new Room created : ${data}`);
    }
  });
});
//listener
app.listen(port, () => console.log(`listening on localhost : ${port}`));
