import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  
  // Controls the state of text boxes for Task and Day and Time
  const [showAddTask, setShowAddTask ] = useState(false)
  
  const [tasks, setTasks ] = useState([])


  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')  // use this with any backend!!
      const data = await res.json()

      console.log(data)
    }
    fetchTasks()
  }, [])

  // Add Task
  const addTask = (task) => {
  // Generate a random task id /  transaction id / job id: 
  // Need to replace the random generated IDS with an actual database
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
}

  // Delete task
  const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

  // Toogle Reminder
  const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) => 
    task.id === id ? {...task, reminder: !task.reminder } : task))
}

return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete=
      {deleteTask} onToggle={toggleReminder}/>
  ) : (
    'No Tasks To Show'
  )}
  </div>
  )
}

export default App;
