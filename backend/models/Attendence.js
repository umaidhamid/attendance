import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "leave", "late"],
      default: "present",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate attendance per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
