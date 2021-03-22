import React from "react";
import "components/AddTodo.css"

function AddTodo(props){
    const addNewTodo = props.addNewTodo
    const handleChange = props.handleChange
    const newTodoValue = props.newTodoValue
    const cantAddNewTodo = props.navigationState === 'completed'
    return(
        <form onSubmit={addNewTodo} className="add-item">
            <input
                disabled={cantAddNewTodo}
                type="text"
                name="newTodo"
                value={newTodoValue}
                onChange={handleChange}
                placeholder="add details"
            />
            <button
                disabled={cantAddNewTodo || !newTodoValue.length}
            >
                Add
            </button>
        </form>
    )
}

export default AddTodo