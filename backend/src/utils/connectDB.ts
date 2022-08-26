import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/qanda");
    console.log("connected to DB");
  } catch (e) {
    process.exit(1);
  }
}


export default connect