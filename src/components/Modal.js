import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MyModal(props) {

    const {
        addTask
    } = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h3>Update List :</h3>
                <form onSubmit={addTask}>
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
            </Modal>
        </div>
    );
}

export default MyModal;
