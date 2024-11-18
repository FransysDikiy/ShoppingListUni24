import React, { useState } from "react";
import { useParams } from "react-router-dom";


const ShoppingListDetails = ({ shoppingLists, setShoppingLists }) => {
    const { id } = useParams();
    const list = shoppingLists.find((list) => list.id === parseInt(id));
    const [newItem, setNewItem] = useState("");
    const [newParticipant, setNewParticipant] = useState("");

    const addParticipant = () => {
        if (newParticipant.trim()) {
            const updatedLists = shoppingLists.map((l) =>
                l.id === list.id
                    ? {
                        ...l,
                        participants: [
                            ...l.participants,
                            { id: Date.now(), name: newParticipant, isOwner: false },
                        ],
                    }
                    : l
            );
            setShoppingLists(updatedLists);
            setNewParticipant(""); // Clear the input field
        }
    };

    const removeParticipant = (participantId) => {
        const updatedLists = shoppingLists.map((l) =>
            l.id === list.id
                ? { ...l, participants: l.participants.filter((p) => p.id !== participantId) }
                : l
        );
        setShoppingLists(updatedLists);
    };



    const addItem = () => {
        if (newItem.trim()) {
            const updatedLists = shoppingLists.map((l) =>
                l.id === list.id
                    ? {
                        ...l,
                        items: [...l.items, { id: Date.now(), name: newItem.trim(), isCompleted: false }],
                    }
                    : l
            );
            setShoppingLists(updatedLists);
            setNewItem(""); // Clear the input field
        }
    };



    const removeItem = (itemId) => {
        const updatedLists = shoppingLists.map((l) =>
            l.id === list.id
                ? { ...l, items: l.items.filter((item) => item.id !== itemId) }
                : l
        );
        setShoppingLists(updatedLists);
    };



    const toggleItemCompletion = (itemId) => {
        const updatedLists = shoppingLists.map((l) =>
            l.id === list.id
                ? {
                    ...l,
                    items: l.items.map((item) =>
                        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
                    ),
                }
                : l
        );
        setShoppingLists(updatedLists);
    };


    if (!list) return <p>List not found!</p>;

    return (
        <div>
            <h2>{list.name}</h2>

            {/* Items Section */}
            <div>
                <h3>Items</h3>
                <input
                    type="text"
                    placeholder="New item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
                <ul>
                    {list.items.map((item) => (
                        <li key={item.id}>
        <span
            style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
                cursor: "pointer",
            }}
            onClick={() => toggleItemCompletion(item.id)}
        >
          {item.name}
        </span>
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Participants Section */}
            <div>
                <h3>Participants</h3>
                <input
                    type="text"
                    placeholder="New participant"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                />
                <button onClick={addParticipant}>Add Participant</button>
                <ul>
                    {list.participants.map((participant) => (
                        <li key={participant.id}>
                            {participant.name} {participant.isOwner && "(Owner)"}
                            {!participant.isOwner && (
                                <button onClick={() => removeParticipant(participant.id)}>Remove</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
};

export default ShoppingListDetails;
