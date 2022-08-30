import mongoose from "mongoose";
import config from "config"

async function connect() {
  try {
    await mongoose.connect(config.get("DB_URI"));
    console.log("connected to DB");
  } catch (e) {
    process.exit(1);
  }
}


export default connect