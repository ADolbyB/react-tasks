import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  
  // Controls the state of text boxes for Task and Day and Time
  const [showAddTask, setShowAddTask ] = useState(false)
  
  const [tasks, setTasks ] = useState([
    {
        id: 1,
        text: 'Give Ashley and Andrew Hugs',
        day: 'Dec 22nd at 9:00 AM',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30 PM',
        reminder: true,
    },
    {
        id: 3,
        text: 'Christmas Break',
        day: 'Dec 22nd at 9:00 AM',
        reminder: true,
    },  
    {
        id: 4,
        text: 'Food Shopping',
        day: 'Feb 6th at 2:30 PM',
        reminder: false,
    },
    {
        id: 5,
        text: 'Food Shopping',
        day: 'Feb 6th at 2:30 PM',
        reminder: false,
    }
])

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
