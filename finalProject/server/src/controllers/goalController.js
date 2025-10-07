import Goal from "../models/Goal.js";

export const getGoals = async (req, res, next) => {
    try {
        // Fetch goals for the authenticated user, sorted by most recent
        const goals = await Goal.find({ user: req.user._id }).sort({ timestamp: -1 });
        return res.status(200).json(goals);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const createGoal = async (req, res, next) => {
    try {
        // Validate input and create a new goal for the authenticated user
        const content = req.body.text;
        if (!content) {
            return res.status(400).json({ message: "Text field is required" });
        }
        const goal = new Goal({ text: content, user: req.user._id });
        await goal.save();
        return res.status(201).json(goal);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteGoal = async (req, res, next) => {
    try {
        // Find and delete the goal if it belongs to the authenticated user
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await goal.deleteOne();
        return res.status(200).json({ id: req.params.id });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
