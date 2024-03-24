import React from 'react';

function Header(props) {
    const {
        items
    } = props;

    const percentage = Math.round(items.length > 0 ? (nbTaskToDo(items) / items.length) * 100 : 0);

    return (
        <header className="header">
            <h2>Todos: </h2>
            <p>You still have {nbTaskToDo(items)} / {items.length} task(s) to complete.</p>
            <p>Remaining tasks : </p>
            <progress value={percentage} max="100"></progress>
            <span> {percentage}%</span>
        </header>
    )
}

function nbTaskToDo(list) {
    const cpt = list.filter(item => !item.done);
    return cpt.length;
}

export default Header;