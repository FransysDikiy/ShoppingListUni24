import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm} style={{ marginRight: "10px" }}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationDialog;


