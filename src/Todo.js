import React from "react";

export default function Todo({todo, toggleTodo}) {

    function changeTodoComplete() {
        toggleTodo(todo.id)
    }

    return(
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onClick={changeTodoComplete}/>
                {todo.name}
            </label>
        </div>
    )
}