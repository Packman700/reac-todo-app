import React from "react";
import Navigation from "./components/Navigation";
import AddTodo from "./components/AddTodo";
import {returnMachIndex} from "./useful_functions/returnMachIndex";
import makeID from "./useful_functions/makeID";
import 'App.css';
import TodoListItems from "./components/TodoListItems";

class App extends React.Component {
    state = {
        allTodos: [], // Ex. data [{text: 'test_todo1', isCompleted: true, id: '1123'}]
        navigationState: 'all',
        newTodo: '',
        editTodoData: {text:'' ,isCompleted: false, isEdited: false}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.editTodoData.isEdited )
            this.saveToLocalStorage()
        else{
            // add edited data to local storage
            const editedTodo = {
                text : this.state.editTodoData.text,
                isCompleted : this.state.editTodoData.isCompleted,
                id : makeID(10)
            }
            this.saveToLocalStorage(editedTodo)
        }
    }

    componentDidMount() {
        const allTodos = JSON.parse(localStorage.getItem('allTodos'))
        const itFirsRun = JSON.parse(localStorage.getItem('itFirsRun'))
        if (itFirsRun === null){
            const sampleData = [
                {text: 'Completed task', isCompleted: true, id: makeID(10)},
                {text: 'Delete me', isCompleted: true, id: makeID(10)},
                {text: 'Uncompleted task', isCompleted: false, id: makeID(10)},
                {text: 'Edit me', isCompleted: false, id: makeID(10)},
            ]
            localStorage.setItem('itFirsRun', 'false')
            this.setState({allTodos: sampleData})
        }
        else this.setState({allTodos})
    }

    saveToLocalStorage(editedTodo= false) {
        let JsonTodos
        if (editedTodo){
            let todosCopy = JSON.parse(JSON.stringify(this.state.allTodos))
            todosCopy.push(editedTodo)
            JsonTodos = JSON.stringify(todosCopy)
        } else
            JsonTodos = JSON.stringify(this.state.allTodos)
        localStorage.setItem('allTodos', JsonTodos)
    }

    changeNavigationState = (event) => {
        const newNavigationState = event.target.dataset.navigationSection
        this.setState({navigationState: newNavigationState})
    }

    handleChange = (event) => {
        const {value, name} = event.target
        this.setState({[name]: value})
    }

    addNewTodo = (event) => {
        event.preventDefault()
        const newTodoText = this.state.newTodo
        const isCompleted = this.state.editTodoData.isCompleted
        if (newTodoText) {
            const newTodo = {text: newTodoText, isCompleted: isCompleted, id: makeID(10)}
            let todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos

            if (todosToFormat !== null) todosToFormat.push(newTodo)
            else todosToFormat = [newTodo]

            this.setState((lastState) => {
                return ({
                    ...lastState,
                    allTodos: todosToFormat,
                    newTodo: '',
                    editTodoData: {isEdited: false, isCompleted: false}
                })
            })
        } else {
            // Some Action if array is empyu
            alert('Cant add empty task')
        }
    }

    deleteTodo = (event) => {
        const {id} = event.target.dataset
        const todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos
        const indexToDelete = returnMachIndex(todosToFormat, id)
        todosToFormat.splice(indexToDelete, 1)

        this.setState({allTodos: todosToFormat})
    }

    deleteAllCompletedTodos = (event) => {
        const todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos

        const newTodos = todosToFormat.filter((todo) => {
            if (!todo.isCompleted) return todo
        })
        this.setState({allTodos: newTodos})
    }

    editTodo = (event) => {
        if (this.state.editTodoData.isEdited)
            alert("First end edit selected todo")
        else {
            const {id} = event.target.dataset
            const allTodos = this.state.allTodos // Deep copy state.allTodos
            const machIndex = returnMachIndex(allTodos, id)
            const todoIsCompleted = allTodos[machIndex].isCompleted
            const todoText = allTodos[machIndex].text
            this.setState({
                newTodo: todoText,
                editTodoData: {isCompleted: todoIsCompleted, isEdited: true, text:todoText}
            })
            this.deleteTodo(event)
        }
    }

    updateCheckState = (event) => {
        const {id} = event.target.dataset
        const todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos
        const machIndex = returnMachIndex(todosToFormat, id)
        todosToFormat[machIndex].isCompleted = !todosToFormat[machIndex].isCompleted

        this.setState({allTodos: todosToFormat})
    }

    render() {
        let todoList = <div/>
        if (this.state.allTodos!==null) {
            todoList = this.state.allTodos.filter((todoItem) => {
                if (this.state.navigationState === 'active' && todoItem.isCompleted === false)
                    return (todoItem)
                if (this.state.navigationState === 'completed' && todoItem.isCompleted === true)
                    return (todoItem)
                if (this.state.navigationState === 'all')
                    return (todoItem)
            }).map((todoItem) => {
                return (
                    <TodoListItems
                        data={todoItem}
                        deleteTodo={this.deleteTodo}
                        updateCheckState={this.updateCheckState}
                        editTodo={this.editTodo}
                        navigationState={this.state.navigationState}
                    />
                )
            })
        }

        return (
            <div id="main-container">
                <h1 id="app-title"> #todo </h1>
                <Navigation
                    changeNavigationState={this.changeNavigationState}
                    navigationState={this.state.navigationState}
                />

                <AddTodo
                    addNewTodo={this.addNewTodo}
                    handleChange={this.handleChange}
                    newTodoValue={this.state.newTodo}
                    navigationState={this.state.navigationState}
                />

                {todoList}

                {
                    this.state.navigationState === 'completed' &&
                    <div className="flex-float-right">
                        <button onClick={this.deleteAllCompletedTodos} id="delete-all-btn">
                            &nbsp;delete all
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default App;
