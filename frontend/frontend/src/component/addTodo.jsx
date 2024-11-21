import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../todo/todoSlice'
const AddTodo = () => {
    const dispatch = useDispatch()
    const [todoState, setTodoState] = useState("")
    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo(todoState))
        setTodoState("")

    }
    const listTodo = (e) => {
        setTodoState(e.target.value)


    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input className=' border-2 border-black rounded-2xl p-2' placeholder='add task' type='text' onChange={listTodo} value={todoState} />
                <button type='submit'></button>
            </form>
        </div>
    )
}

export default AddTodo