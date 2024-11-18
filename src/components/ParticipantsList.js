import React, { useState } from "react";

const ParticipantsList = ({ participants, onAddParticipant, onRemoveParticipant }) => {
    const [newParticipant, setNewParticipant] = useState("");

    const handleAdd = () => {
        if (newParticipant.trim()) {
            onAddParticipant(newParticipant);
            setNewParticipant("");
        }
    };

    return (
        <div>
            <h2>Participants</h2>
            <input
                type="text"
                placeholder="Add Participant"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {participants.map((participant) => (
                    <li key={participant.id}>
                        {participant.name}{" "}
                        <button onClick={() => onRemoveParticipant(participant.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantsList;

