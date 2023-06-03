import React from "react";

const DescriptionScreen = ({ book, onClose }) => {
  return (
    <div className="DescriptionScreen">
      <p>{book.description}</p>
      <button onClick={onClose} className="closeButton">
        x
      </button>
    </div>
  );
};

export default DescriptionScreen;
