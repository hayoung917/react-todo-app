import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import ClearAll from "./components/ClearAll";
import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {
  console.log("App Component");

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("todoData"));
    if (todoData) {
      setTodoData(todoData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  const handleSubmit = (e) => {
    //페이지 리로드 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    //원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <ClearAll setTodoData={setTodoData} />
        </div>
        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
