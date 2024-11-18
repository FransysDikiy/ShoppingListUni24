import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationDialog from "./components/ConfirmationDialog";

const ShoppingListsOverview = ({
                                   shoppingLists,
                                   onAddShoppingList,
                                   onDeleteShoppingList,
                                   onArchiveShoppingList,
                               }) => {
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [showArchived, setShowArchived] = useState(false);
    const [confirmation, setConfirmation] = useState(null); // Manage confirmation actions

    const handleAdd = () => {
        if (newListName.trim() && ownerName.trim()) {
            onAddShoppingList({
                name: newListName,
                items: [],
                participants: [{ id: Date.now(), name: ownerName, isOwner: true }],
                isArchived: false,
            });
            setNewListName("");
            setOwnerName("");
            setShowModal(false);
        }
    };

    const confirmDelete = (listId) => {
        setConfirmation(() => () => onDeleteShoppingList(listId)); // Set the action to confirm
    };

    const cancelConfirmation = () => {
        setConfirmation(null); // Clear confirmation action
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Add New List</button>
            <button onClick={() => setShowArchived(!showArchived)}>
                {showArchived ? "Hide Archived Lists" : "See Archived Lists"}
            </button>

            {(showArchived
                    ? shoppingLists.filter((list) => list.isArchived)
                    : shoppingLists.filter((list) => !list.isArchived)
            ).map((list) => (
                <div key={list.id} className="list-tile">
                    <h3>{list.name}</h3>
                    <Link to={`/details/${list.id}`}>View Details</Link>
                    <button onClick={() => confirmDelete(list.id)}>Delete</button>
                    <button onClick={() => onArchiveShoppingList(list.id)}>Archive</button>
                </div>
            ))}

            {confirmation && (
                <ConfirmationDialog
                    message="Are you sure you want to delete this shopping list?"
                    onConfirm={() => {
                        confirmation(); // Execute the saved action
                        cancelConfirmation(); // Close dialog
                    }}
                    onCancel={cancelConfirmation}
                />
            )}

            {showModal && (
                <div className="modal">
                    <h2>Create New List</h2>
                    <input
                        type="text"
                        placeholder="List Name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Owner Name"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                    <button onClick={handleAdd}>Create</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ShoppingListsOverview;
