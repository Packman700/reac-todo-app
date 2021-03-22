import React from "react";
import binIcon from "icons/delete_outline-black-18dp.svg"
import editIcon from "icons/edit.svg"
import "components/TodoListItems.css"
import "styles/icons.css"
import "styles/checkox.css"
import "styles/margins_paddings.css"

function TodoListItems(props){
    const text = props.data.text
    const isCompleted = props.data.isCompleted
    const id = props.data.id
    return(
        <div className="todo-item-container">
            {/*className=*/}
            <label className="control control-checkbox">
                <input type="checkbox"
                       name="isCompleted"
                       checked={isCompleted}
                       data-id={id}
                       onClick={props.updateCheckState}/>
                <div className="control_indicator"/>
            </label>

            <p className={isCompleted?"todo-text completed":"todo-text"}> {text} </p>

            <div className="todo-icons">
                { props.navigationState !== "completed" &&
                <img
                    className="light-gray-icon ml6"
                    width="20px" height="20px"
                    src={editIcon}
                    onClick={props.editTodo}
                    data-id={id}
                    alt="edit icon"
                />
                }

                <img
                    className="light-gray-icon"
                    width="20px" height="20px"
                    src={binIcon}
                    onClick={props.deleteTodo}
                    data-id={id}
                    alt="bin icon"
                />
            </div>

        </div>
    )
}

export default TodoListItems