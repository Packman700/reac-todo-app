import React from "react";
import Navigation from "./components/Navigation";
import AddTodo from "./components/AddTodo";
import {returnMachIndex} from "./useful_functions/returnMachIndex";
import makeID from "./useful_functions/makeID";
import './App.css';
import TodoListItems from "./components/TodoListItems";

class App extends React.Component {
    state = {
        allTodos:[{text:'test_todo1', isCompleted:true, id:'1123'}, {text:'test_todo2', isCompleted:true, id:'11223'}],
        navigationState:'all',
        newTodo:'',
        editTodoData:{isCompleted:false, isEdited:false}
    }

    changeNavigationState = (event) => {
        // const newNavigationState = event.target.value
        const newNavigationState = event.target.dataset.navigationSection
        console.log(newNavigationState)
        this.setState({navigationState: newNavigationState})
    }

    handleChange = (event) => {
        const {value, name} = event.target
        this.setState({[name]:value})
    }

    addNewTodo = (event) => {
        event.preventDefault()
        const newTodoText = this.state.newTodo
        const isCompleted = this.state.editTodoData.isCompleted
        if (newTodoText) {
            const newTodo = {text: newTodoText, isCompleted: isCompleted, id:makeID(10)}
            const todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos
            todosToFormat.push(newTodo)

            this.setState((lastState) => {
                return ({
                    ...lastState,
                    allTodos: todosToFormat,
                    newTodo: '',
                    editTodoData:{isEdited:false, isCompleted: false}
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
        todosToFormat.splice(indexToDelete,1)

        this.setState({allTodos: todosToFormat})
    }

    updateCheckState = (event) => {
        const {id} = event.target.dataset
        const todosToFormat = JSON.parse(JSON.stringify(this.state.allTodos)) // Deep copy state.allTodos
        const machIndex = returnMachIndex(todosToFormat, id)
        todosToFormat[machIndex].isCompleted = !todosToFormat[machIndex].isCompleted

        this.setState({allTodos: todosToFormat})
    }

    editTodo = (event) => {
        if (this.state.editTodoData.isEdited)
            alert("First end edit selected todo")
        else{
            const {id} = event.target.dataset
            const allTodos = this.state.allTodos // Deep copy state.allTodos
            const machIndex = returnMachIndex(allTodos, id)
            const todoIsCompleted = allTodos[machIndex].isCompleted
            const todoText = allTodos[machIndex].text
            this.setState({
                    newTodo:todoText,
                    editTodoData:{isCompleted:todoIsCompleted, isEdited:true}
            })
            this.deleteTodo(event)
        }
    }

    render() {
        const todoList = this.state.allTodos.filter((todoItem) => {
            if (this.state.navigationState === 'active' && todoItem.isCompleted === false)
                return(todoItem)
            if (this.state.navigationState === 'completed' && todoItem.isCompleted === true)
                return(todoItem)
            if (this.state.navigationState === 'all')
                return(todoItem)
        })
            .map((todoItem)=>{
                return (
                    <TodoListItems
                        data = {todoItem}
                        deleteTodo = {this.deleteTodo}
                        updateCheckState = {this.updateCheckState}
                        editTodo = {this.editTodo}
                    />
                )
            })


        return (
            <div className="App">
                <Navigation
                    changeNavigationState={this.changeNavigationState}
                />

                <AddTodo
                    addNewTodo={this.addNewTodo}
                    handleChange={this.handleChange}
                    newTodoValue={this.state.newTodo}
                    navigationState={this.state.navigationState}
                />

                {todoList}
            </div>
        )
    }
}

export default App;
