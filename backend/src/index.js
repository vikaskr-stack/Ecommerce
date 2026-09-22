import "dotenv/config";

import { app } from "./app.js";
import connectDB  from "./db/connectDB.js";
import dns from "dns"

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const Port = process.env.PORT || 8000;


connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`🚀 Server running on http://localhost:${Port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });