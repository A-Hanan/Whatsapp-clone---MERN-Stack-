import mongoose from "mongoose";
const whatsappSchema = mongoose.Schema({
  name: String,
});
//messagecontent is collection
export default mongoose.model("roomscontents", whatsappSchema);
