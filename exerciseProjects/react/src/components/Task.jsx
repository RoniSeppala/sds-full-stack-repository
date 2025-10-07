function Task({ task }) {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
        </div>
    )
}
export default Task