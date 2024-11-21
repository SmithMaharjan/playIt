import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo } from '../todo/todoSlice'

const Todo = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const deleteTodo = (id) => {
        dispatch(removeTodo(id))


    }

    return (
        <div>{todos.map((todo) => (
            <div>
                {todo.text}
                <button className=' bg-red-600 px-2 py-2 rounded-xl text-white text-sm font-medium' onClick={() => { deleteTodo(todo.id) }}>delete</button>

            </div>

        ))}</div>
    )
}

export default Todo