import React from "react";
import binIcon from "icons/delete_outline-black-18dp.svg" // in future add react-relative-path

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
                src={binIcon}
                onClick={props.deleteTodo}
                data-id={id}
            />
        </div>
    )
}

export default TodoListItems