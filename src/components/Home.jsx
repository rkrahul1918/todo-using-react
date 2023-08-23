import "../styles/Home.css"
import React, { useEffect } from 'react';
import Task from "./Tasks";



import { useState } from "react";

const Home = () => {


  const [tasks, SetTask] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");


  console.log(title);
  console.log(description);

  const submitHandler = (e) => {
    e.preventDefault();

    SetTask([...tasks, {
      title, description,
    }])
    console.log(tasks);
    SetTitle("");
    SetDescription("");

  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const deleteTask = (index) => {


    const filteredArray = tasks.filter((val, i) => {
      return i !== index;
    });

    console.log(filteredArray);
    SetTask(filteredArray);

  }
  return (
    <div className="container">
      <h1><center>Task List</center></h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => {
          SetTitle(e.target.value)
        }} />
        <textarea placeholder="Description" value={description} onChange={(e) => {
          SetDescription(e.target.value)
        }}></textarea>
        <button type="submit">Add</button>
      </form>
      {tasks.map((item, index) => {
        return <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index} />
      })}
    </div>
  );
}

export default Home;
