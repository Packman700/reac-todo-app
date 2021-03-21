import React from "react";
import binIcon from "icons/delete_outline-black-18dp.svg" // in future add react-relative-path
import editIcon from "icons/edit.svg" // in future add react-relative-path

function TodoListItems(props){
    const text = props.data.text
    const isCompleted = props.data.isCompleted
    const id = props.data.id
    return(
        <div className="todoItem">
            <label className={isCompleted?'':'uncompleted'}>
                <input
                    type="checkbox"
                    name="isCompleted"
                    checked={isCompleted}
                    data-id={id}
                    onClick={props.updateCheckState}
                />
                {text}
            </label>
            <img
                width="18px" height="18px"
                src={binIcon}
                onClick={props.deleteTodo}
                data-id={id}
                alt="bin icon"
            />

            <img
                width="18px" height="18px"
                src={editIcon}
                onClick={props.editTodo}
                data-id={id}
                alt="edit icon"
            />


        </div>
    )
}

export default TodoListItems