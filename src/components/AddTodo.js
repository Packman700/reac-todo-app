import React from "react";

function AddTodo(props){
    const addNewTodo = props.addNewTodo
    const handleChange = props.handleChange
    const newTodoValue = props.newTodoValue
    const cantAddNewTodo = props.navigationState === 'completed'
    return(
        <form onSubmit={addNewTodo}>
            <input
                disabled={cantAddNewTodo}
                type="text"
                name="newTodo"
                value={newTodoValue}
                onChange={handleChange}
            />
            <button disabled={cantAddNewTodo}>
                Add
            </button>
        </form>
    )
}

export default AddTodo