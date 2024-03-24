import React, { useState } from "react";

function TodoList(props) {
    const {
        tasks,
        changeOrder,
        handleChange,
        deleteTask,
        deleteAllTask
    } = props;

    const [showStar, setShowStar] = useState(true);

    const toggleStar = () => {
        setShowStar(!showStar);
    };

    const filteredItems = tasks.items.filter(item =>
        item.text.toLowerCase().startsWith(tasks.searchText.toLowerCase())
    );

    const handleDelete = (id) => {
        deleteTask(id);
    }

    const handleAllDelete = () => {
        deleteAllTask();
    }

    return (
        <todoList>
            <h3>List :</h3>
            <ol className="task-list">
                {filteredItems.map(item => (
                    <li key={item.id} className={`task-item ${getAnimation(item.date, item.done)}`}>
                        <span className="vbox">
                            <button onClick={() => changeOrder(item.id, item.id - 1)}>↑</button>
                            <button onClick={() => changeOrder(item.id, item.id + 1)}>↓</button>
                        </span>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.done}
                                onClick={() => handleChange(item.id)}
                            />
                            <span className={item.done ? "done" : ""}>{item.text} : </span>
                            <span className={`task-info ${getTextStyle(item.date)}`}>{getNbDay(item.date)} day(s)</span>
                        </label>
                        <button className="bin" onClick={() => handleDelete(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                                <path
                                    d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"/>
                            </svg>
                        </button>
                    </li>
                ))}
            </ol>
            <button className="bin bigBin" onClick={() => handleAllDelete()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" height="50px">
                    <path
                        d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"/>
                </svg>
            </button>
        </todoList>
    )
}


function getTextStyle(date) {
    const taskDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24)) + 1;
    if (differenceInDays < 0) {
        return "exceeded";
    } else if (differenceInDays < 3) {
        return "urgent";
    } else {
        return "nice";
    }
}

function getAnimation(date, check) {
    const taskDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24)) + 1;
    if (differenceInDays < 0 && check == false) {
        return "animation-exceeded";
    } else
        return "";
}

function getNbDay(date) {
    const taskDate = new Date(date);
    const today = new Date();
    const difference = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24)) + 1;
    if (difference < 0)
        return 0;
    else
        return difference;
}


export default TodoList;





{/*

            <select title="Filter">
                <option value="option1">No filter</option>
                <option value="option2">Checked</option>
                <option value="option3">Favory</option>
            </select>
                        <button className={showStar ? "star show" : "star hide"} onClick={toggleStar}>
                            {showStar ? (
                                <svg fill="#fcab03" height="20px" width="20px" version="1.1" id="Capa_1"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 473.486 473.486" stroke="#fcab03">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <polygon
                                            points="473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 237.732,386.042 384.416,460.829 357.032,298.473 "></polygon>
                                    </g>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                                    <path
                                        d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"/>
                                </svg>
                            )}
                        </button>

*/}