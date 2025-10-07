import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

export default function GoalItem({ goal }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteGoal(goal._id));
    };

    return (
        <div className="goal-item">
            <div>{new Date(goal.timestamp).toLocaleString()}</div>
            <p>{goal.text}</p>
            <button onClick={handleDelete} className="btn">Delete</button>
        </div>
    );
}