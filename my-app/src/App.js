import './App.css';
import  { useRef } from "react";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
// import  Dashboard  from "./MyComponents/Dashboard";
import { useNavigate } from "react-router-dom";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import Login from "./MyComponents/Login";
import React, { useState, useEffect } from 'react';

import ProtectedRoute from "./MyComponents/ProtectedRoute"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './MyComponents/register';
import Dashboard from './MyComponents/Dashboard';
import ProtectedLogin from './MyComponents/protectlogin';

function App() {
  const ServicesRef = useRef(null);

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const navigate = useNavigate();

  const enterfunc = e =>  {
    e.preventDefault();
    if (localStorage.getItem("myvar") == "true") {

      const nav = () => navigate('/dashboard');
      nav();
    }
    else {
      // <Header/>
      const nav = () => navigate('/home');
      nav();
    }
    console.log('some');
  }

  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  var temp = {
    some: true
  }
  var temp2 = { some: false }
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route exact path='/dashboard' element={
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route exact path='/login' element={
          <ProtectedLogin>

            <Login temp={temp} />
          </ProtectedLogin>
        } />
        <Route exact path='/register' element={
          <ProtectedLogin>

            <Login temp2={temp2} />
          </ProtectedLogin>
        } />
        <Route exact path='/' element={
          <div>
            <Header/>
            
          </div>
        } />
        <Route exact path="/home" element={
          <Header />
        }/>
      </Routes>
      <Footer />

    </>
  );
}

export default App;
