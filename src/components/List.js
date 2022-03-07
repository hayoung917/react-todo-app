import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    console.log("List Component");

    const [editTitle, setEditTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });

      setTodoData(newTodoData);
    };

    const handleEdit = (e) => {
      setEditTitle(e.target.value);
    };

    const handleSaved = (id) => {
      if (title !== editTitle) {
        let newTodoData = todoData.map((data) => {
          if (data.id === id) {
            data.title = editTitle;
          }
          return data;
        });

        setTodoData(newTodoData);
      }
    };

    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.target.blur();
      }
    };

    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            defaultChecked={completed ? true : false}
            onChange={() => handleCompleteChange(id)}
          />
          <input
            className={`${
              completed ? "line-through" : undefined
            } bg-gray-100 px-2 mx-2`}
            type="text"
            name="value"
            value={editTitle}
            onChange={handleEdit}
            onKeyDown={handleEnter}
            onBlur={() => handleSaved(id)}
          ></input>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >
            x
          </button>
        </div>
      </div>
    );
  }
);

export default List;
