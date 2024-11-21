import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    todos: [{ id: 1, text: "task 1 " }]
}
export const splice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: Date.now(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(f => f.id !== action.payload)
        }

    }
})
export const { addTodo, removeTodo } = splice.actions
export default splice.reducer