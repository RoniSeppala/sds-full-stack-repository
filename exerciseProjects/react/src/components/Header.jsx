function Header({ showAdd, onToggle }) {
    return (
        <header className="header">
            <h1>Task Tracker (demo)</h1>
            <button className="btn" style={{ backgroundColor: showAdd ? '#ef4444' : '#22c55e' }} onClick={onToggle}>
                {showAdd ? 'Close' : 'Add'}
            </button>
        </header>
    )
}
export default Header