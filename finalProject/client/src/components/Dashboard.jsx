import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchGoals, reset } from "../features/goals/goalSlice"
import NewGoalForm from "./NewGoalForm"
import GoalItem from "./GoalItem"
import Spinner from "./LoadSpinner.jsx"

export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        dispatch(fetchGoals(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null))
        return () => { dispatch(reset()) }
    }, [user, navigate])

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        toast.error(message)
    }

    if (!user) {
        navigate('/login')
        return null
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user.name}</h1>
                <p>Goals dashboard</p>
            </section>

            <NewGoalForm />

            <section className="content">
                {goals.length === 0 ? (
                    <h3>No goals yet</h3>
                ) : (
                    goals.map((g) => <GoalItem key={g._id} goal={g} />)
                )}
            </section>
        </>
    );
}