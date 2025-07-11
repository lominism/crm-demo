require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri);

async function testConnection() {
  if (!uri) {
    console.error("MONGODB_URI is not defined!");
    process.exit(1);
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

testConnection();
