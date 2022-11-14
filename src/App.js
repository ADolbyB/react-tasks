import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {

  // Controls the state of text boxes for Task and Day and Time
  const [ showAddTask, setShowAddTask ] = useState(false)
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks from backend
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')  // use this with any backend!!
    const data = await res.json()

    //console.log(data) //DEBUG
    return data
    }

    // Fetch Single Task from backend
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)  // use this with any backend!!
      const data = await res.json()

      //console.log(data) //DEBUG
      return data
    }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    //return new task added
    const data = await res.json()

    setTasks([...tasks, data])
  // // Generate a random task id /  transaction id / job id: 
  // // Need to replace the random generated IDS with an actual database
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}

  // Delete task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'DELETE' 
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200 
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
}

  // Toogle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle, reminder: !taskToToggle.reminder
      }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()   // In full stack, we need our own REST API and framework

  setTasks(
    tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder } : task
    )
  )
}

return (
    <Router>
        <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
          <Routes>
            <Route path="/" element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete=
                {deleteTask} onToggle={toggleReminder}/>
                ) : (
                  'No Tasks To Show'
                )}
              </>
            } />
            <Route path='/about' element={<About />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  )
}

export default App;
