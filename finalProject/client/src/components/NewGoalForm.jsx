import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

export default function NewGoalForm() {
    const [goalText, setGoalText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (goalText.trim()) {
            dispatch(createGoal({ text: goalText }));
            setGoalText("");
        }
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={goalText}
                        onChange={(e) => setGoalText(e.target.value)}
                        placeholder="Enter your goal"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn">Add Goal</button>
                </div>
            </form>
        </section>
    );
}