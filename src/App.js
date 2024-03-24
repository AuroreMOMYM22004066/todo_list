import React from "react";
import './App.css';
import Modal from 'react-modal';

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer"
import MyModal from "./components/Modal";

Modal.setAppElement('#root');
class App extends React.Component {
    constructor(props) {
        super(props);
        const storedItems = localStorage.getItem('todoItems');
        this.state = {
            // { id: 0, ordre: 0,text: "Learn JavaScript", date: "2024-03-15", done: false },
            items: storedItems ? JSON.parse(storedItems) : [],
            searchText: "" // Texte de recherche initial vide
        };

        // Binding des méthodes pour qu'elles puissent accéder à this
        //this.nbTaskToDo = this.nbTaskToDo.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.deleteAllTasks = this.deleteAllTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.lastId = this.lastId.bind(this);

        this.state.nextId = this.lastId(); // Initialisation du compteur d'identifiants
    }

    componentDidUpdate() {
        localStorage.setItem('todoItems', JSON.stringify(this.state.items));
    }

    lastId() {
        const { items } = this.state;
        if (items.length === 0) {
            return 0;
        } else {
            return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
        }
    }




    deleteTask(idTask) {
        const updatedItems = this.state.items.filter(item => item.id !== idTask);
        this.setState({ items: updatedItems });
    }

    deleteAllTasks() {
        this.setState({ items: [] });
    }

    addTask(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire
        const textTask = event.target.elements.task.value.trim();
        let dateTask = event.target.elements.date.value; // Récupérer la date depuis le champ de saisie
        if (!textTask || !dateTask)
            dateTask = new Date().toISOString().slice(0, 10); // Format ISO (YYYY-MM-DD)

        const newId = this.state.nextId;
        const newTask = { id: newId, text: textTask, date: dateTask, done: false};
        this.setState(prevState => ({
            items: [newTask, ...prevState.items],
            nextId: prevState.nextId + 1 // Incrémenter le compteur pour le prochain identifiant
        }));
        event.target.reset(); // Réinitialiser le formulaire après l'ajout de la tâche
    }

    handleChange(id) {
        this.setState(prevState => ({
            items: prevState.items.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        }));
    }

    changeOrder(id, nid) {

        // set nid in [0, this.state.nextId]
        nid = (nid + this.state.nextId) % this.state.nextId;

        // update list
        const updatedItems = this.state.items;
        const itemToMove = updatedItems.splice(id, 1)[0];
        updatedItems.splice(nid, 0, itemToMove);

        // reset id order
        for(let i = 0; i < this.state.nextId; ++i){
            this.state.items[i].id = i;
        }

        // update board
        this.setState({ items: updatedItems }, () => {
            this.forceUpdate();
        });

    }

    handleSearchChange(event) {
        // Mettre à jour le texte de recherche lorsqu'il y a un changement dans la zone de recherche
        this.setState({ searchText: event.target.value });
    }

    getTextStyle(date) {
        // Fonction pour déterminer la classe CSS de la bordure en fonction de la date de la tâche
        const taskDate = new Date(date);
        const today = new Date();
        const differenceInDays = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24));
        if (differenceInDays < 0) {
            return "exceeded"; // Date dépassée
        } else if (differenceInDays < 3) {
            return "urgent"; // Date proche
        } else {
            return "nice"; // Date lointaine
        }
    }

    render() {

        // Filtrer les tâches en fonction du texte de recherche
        const filteredItems = this.state.items.filter(item =>
            item.text.toLowerCase().startsWith(this.state.searchText.toLowerCase())
        );

        return (
            <div className={"todo-list"}>
                <Header
                    items={this.state.items}
                />
                <TodoList
                    tasks={this.state}
                    changeOrder={this.changeOrder}
                    handleChange={this.handleChange}
                    deleteTask={this.deleteTask}
                    deleteAllTask={this.deleteAllTasks}
                />
                <Footer
                    tasks={this.state}
                    handleSearchChange={this.handleSearchChange}
                    addTask={this.addTask}
                />
                {/*<p>You still have {this.nbTaskToDo()} / {this.state.items.length} task(s) to complete.</p>*/}

            </div>
        );
    }
}

export default App;

{/*
<h2>Todos : </h2>
                <h3>Search Zone :</h3>
<input
    type="text"
    placeholder="Search for a task..."
    value={this.state.searchText}
    onChange={this.handleSearchChange}
/>

<br></br>
<h3>List :</h3>
<ol className="task-list">
    {filteredItems.map((item, index) => (
        <li key={item.id} className="task-item">
            <button onClick={() => this.changeOrder(item.id, item.id - 1)}>↑</button>
            <button onClick={() => this.changeOrder(item.id, item.id + 1)}>↓</button>
            <label>
                <input
                    type="checkbox"
                    checked={item.done}
                    onClick={() => this.handleChange(item.id)}
                />
                <span className={item.done ? "done" : ""}>{item.text} : </span>
                <span className={this.getTextStyle(item.date)}> {item.date} </span>
            </label>
            <button onClick={() => this.deleteTask(item.id)}>Delete</button>
        </li>
    ))}
</ol>
<br></br>
<h3>Update List :</h3>
<form onSubmit={this.addTask}>
    <input
        type="text"
        name="task"
        placeholder="Enter a new task..."
    />
    <input
        type="date" // Champ de saisie pour la date
        name="date"
    />
    <button type="submit">Add</button>
</form>
<br></br>
<button onClick={() => this.deleteAllTasks()}>Delete All</button>
*/}