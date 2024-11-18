import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ParticipantsList from "./components/ParticipantsList";
import ShoppingListsOverview from "./ShoppingListsOverview";
import ShoppingListDetails from "./ShoppingListDetails";

const App = () => {
    const [participants, setParticipants] = useState([
        { id: 1, name: "Alex" },
        { id: 2, name: "Lukas" },
        { id: 3, name: "Maria" },
    ]);

    const [shoppingLists, setShoppingLists] = useState([
        {
            id: 1,
            name: "Groceries",
            items: [{ id: 1, name: "Milk", resolved: false }, { id: 2, name: "Bread", resolved: false }],
            participants: [
                { id: 1, name: "Alex", isOwner: true },
                { id: 2, name: "Lukas", isOwner: false },
            ],
        },
        {
            id: 2,
            name: "Electronics",
            items: [{ id: 1, name: "Laptop", resolved: false }, { id: 2, name: "Headphones", resolved: false }],
            participants: [
                { id: 3, name: "Maria", isOwner: true },
                { id: 2, name: "Lukas", isOwner: false },
            ],
        },
    ]);


    const handleAddParticipant = (name) => {
        const newId = Date.now();
        setParticipants([...participants, { id: newId, name }]);
    };

    const handleRemoveParticipant = (id) => {
        setParticipants(participants.filter((participant) => participant.id !== id));
    };

    const handleAddShoppingList = (newList) => {
        const newId = Date.now(); // Generate a unique ID for the new list
        setShoppingLists([
            ...shoppingLists,
            { id: newId, ...newList }, // Spread the new list properties
        ]);
    };


    const handleDeleteShoppingList = (id) => {
        setShoppingLists(shoppingLists.filter((list) => list.id !== id));
    };

    const handleArchiveShoppingList = (id) => {
        setShoppingLists(
            shoppingLists.map((list) =>
                list.id === id ? { ...list, isArchived: true } : list
            )
        );
    };




    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Shopping List Manager</h1>
                    <nav>
                        <Link to="/">Home</Link>
                    </nav>

                </header>
                <Routes>
                <Route
                        path="/"
                        element={
                            <ShoppingListsOverview
                                shoppingLists={shoppingLists}
                                onAddShoppingList={handleAddShoppingList}
                                onDeleteShoppingList={handleDeleteShoppingList}
                                onArchiveShoppingList={handleArchiveShoppingList} // Pass the function here
                            />

                        }
                    />
                    <Route
                        path="/details/:id"
                        element={
                            <ShoppingListDetails
                                shoppingLists={shoppingLists}
                                setShoppingLists={setShoppingLists}
                            />
                        }
                    />
                    <Route
                        path="/participants"
                        element={
                            <ParticipantsList
                                participants={participants}
                                onAddParticipant={handleAddParticipant}
                                onRemoveParticipant={handleRemoveParticipant}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

