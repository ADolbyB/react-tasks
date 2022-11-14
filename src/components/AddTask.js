import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please Add Text to Task')
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)        
    }

    return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task Name</label>
            <input type="text" placeholder="Add Task Description" 
            value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day and Time</label>
            <input type="text" placeholder="Add Day and Time"
            value={day} onChange={(e) => setDay(e.target.value)} />
        </div> 
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={reminder} 
            value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        <input type="submit" value="Save Task" className="btn btn-block"></input>
    </form>
  )
}

export default AddTask
