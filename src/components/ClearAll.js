import React from "react";

export default function ClearAll({ setTodoData }) {
  const handleClearAll = () => {
    setTodoData([]);
  };

  return (
    <div>
      <button
        className="p-2 text-gray-400 border-2 border-gray-400 rounded-full hover:text-white hover:bg-gray-600"
        onClick={handleClearAll}
      >
        Clear
      </button>
    </div>
  );
}
