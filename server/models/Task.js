const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in_progress", "completed"],
      default: "todo",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-populate assignedTo on find queries
taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assignedTo",
    select: "name email",
  });
  next();
});

module.exports = mongoose.model("Task", taskSchema);
