import mongoose from "mongoose";
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  room_id: String,
});
//messagecontent is collection
export default mongoose.model("messagecontents", whatsappSchema);
