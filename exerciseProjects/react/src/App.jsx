import { useState } from "react";
import Header from "./components/Header.jsx";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([ //inmemory tasks for demo
        { id: 1, text: "Doctors Appointment", day: "Feb 5th at 2:30pm", reminder: true },
        { id: 2, text: "Meeting at School", day: "Feb 6th at 1:30pm", reminder: true },
        { id: 3, text: "Food Shopping", day: "Feb 5th at 2:30pm", reminder: false }
    ]);

    const addTask = ({ text, day, reminder }) => {
        const newTask = { id: Date.now(), text, day, reminder: !!reminder };
        setTasks((prev) => [...prev, newTask]);
    };

    return (
        <>
            <div className="container">
                <Header onToggle={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? tasks.map((t) => <Task key={t.id} task={t} />) : "No Tasks To Show"}
            </div>
        </>
    );
}

export default App;
