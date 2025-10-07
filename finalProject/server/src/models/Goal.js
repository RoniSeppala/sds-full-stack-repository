import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    text: {type: String, required: true, trim: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    timestamp: {type: Date, default: Date.now}
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;