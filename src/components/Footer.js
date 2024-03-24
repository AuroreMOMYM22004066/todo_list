import React, { useState } from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

function Footer(props) {
    const {
        tasks,
        handleSearchChange,
        addTask
    } = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        addTask(e); // Ajouter la tâche
        closeModal(); // Fermer le modal
    };

    return (
        <footer className="footer">
            {/* Zone de recherche */}
            <input
                type="text"
                placeholder="Search for a task..."
                value={tasks.searchText}
                onChange={handleSearchChange}
            />
            <button onClick={openModal}>+</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h3>Update List :</h3>
                <form onSubmit={handleSubmit}>
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
                <br />
            </Modal>
        </footer>
    )
}

export default Footer;
