import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
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

// Delete task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toogle Reminder
const toggleReminder = (id) => {
  console.log(id)
}
  
  return (
    <div className="container">
      <Header />
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
