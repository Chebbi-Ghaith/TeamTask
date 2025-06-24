const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["à faire", "en cours", "terminée"],
      default: "à faire",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assignedTo",
    select: "name email",
  });
  next();
});

module.exports = mongoose.model("Task", taskSchema);
