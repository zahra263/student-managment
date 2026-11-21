const mongoose = require("mongoose");
const dns = require("node:dns");
// mongoose library ko import kiya.

// Database connection function banaya jo async hai. Ye function try-catch block me hai taki agar connection me koi error aaye to usko handle kiya ja sake.
const connectDB = async () => {
  try {
    const dnsServers =
      process.env.MONGO_DNS_SERVERS || "8.8.8.8,8.8.4.4";
    const servers = dnsServers.split(",").map((server) => server.trim());
    if (servers.some((server) => !server)) {
      throw new Error("MONGO_DNS_SERVERS must be a comma-separated list of DNS servers.");
    }
    dns.setServers(servers);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;