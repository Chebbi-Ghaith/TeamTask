const mongoose = require("mongoose");
require("dotenv").config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear the users collection
    const userResult = await mongoose.connection.db
      .collection("users")
      .deleteMany({});
    console.log(`Deleted ${userResult.deletedCount} users`);

    // Clear the tasks collection
    const taskResult = await mongoose.connection.db
      .collection("tasks")
      .deleteMany({});
    console.log(`Deleted ${taskResult.deletedCount} tasks`);

    console.log("Database cleared successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing database:", error);
    process.exit(1);
  }
};

clearDatabase();
