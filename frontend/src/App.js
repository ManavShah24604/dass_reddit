import './App.css';
import { useRef } from "react";
import Header from "./MyComponents/Header";
import { useNavigate } from "react-router-dom";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import Login from "./MyComponents/Login";
import React, { useState, useEffect } from 'react';
import Welcome from './MyComponents/welcome'
import Follower from './MyComponents/Followers'
import ProtectedRoute from "./MyComponents/ProtectedRoute"
import DashboardNavbar from "./MyComponents/Dashboard_navbar"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './MyComponents/register';
import Dashboard from './MyComponents/Dashboard';
import ProtectedLogin from './MyComponents/protectlogin';
import Following from './MyComponents/Following';
import ProtectedFollowers from './MyComponents/protectedfollowers';
import ProtectedFollowing from './MyComponents/protectedfollowing';
import MysubGreddit from './MyComponents/MysubGreddit';
import SubgForm from './MyComponents/FormSubg';
import Subg from './MyComponents/Subg'
import MySubgParticular from './MyComponents/MySubgParticular';
import JoiningPage from './MyComponents/joiningpage';
import SubgPage from './MyComponents/SubgPage';
import SavedPosts from './MyComponents/savedPosts';
import Users from './MyComponents/Users';
import ReportPage from './MyComponents/Report';
import Blockedusers from './MyComponents/blockedusers';
import  LineChart2  from './MyComponents/stats';

function App() {
  const ServicesRef = useRef(null);



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

            <Login />
          </ProtectedLogin>
        } />
        <Route exact path='/register' element={
          <ProtectedLogin>

            <Login />
          </ProtectedLogin>
        } />
        <Route exact path='/' element={
          <div>
            <Header />
            <Welcome />
          </div>
        } />
        <Route exact path="/home" element={
          <div>
            <Header />
            <Welcome />
          </div>
        } />
        <Route exact path="/followers" element={

          <ProtectedRoute>
            <Follower />
          </ProtectedRoute>

        } />

        <Route exact path="/following" element={
          <ProtectedRoute>
            <Following />
          </ProtectedRoute>} />
        <Route exact path="/mysubg" element={
          <ProtectedRoute>
            <MysubGreddit />
          </ProtectedRoute>} />
          <Route exact path="/mysubgform" element={
          <ProtectedRoute>
            <SubgForm/>
          </ProtectedRoute>} />

          <Route exact path="/subg" element={
          <ProtectedRoute>
            <Subg/>
          </ProtectedRoute>} />
          <Route exact path="/mysubgparticular" element={
          <ProtectedRoute>
            <MySubgParticular/>
          </ProtectedRoute>} />
          <Route exact path="/joiningpage" element={
          <ProtectedRoute>
            <JoiningPage/>
          </ProtectedRoute>} />
          <Route exact path="/subgpage" element={
          <ProtectedRoute>
            <SubgPage/>
          </ProtectedRoute>} />
          <Route exact path="/savedPosts" element={
          <ProtectedRoute>
            <SavedPosts/>
          </ProtectedRoute>} />

          <Route exact path="/users" element={
          <ProtectedRoute>
            <Users/>
          </ProtectedRoute>} />

          <Route exact path="/report" element={
          <ProtectedRoute>
            <ReportPage/>
          </ProtectedRoute>} />

          <Route exact path="/blockedusers" element={
          <ProtectedRoute>
            <Blockedusers/>
          </ProtectedRoute>} />

          <Route exact path="/stats" element={
          <ProtectedRoute>
            <LineChart2/>
          </ProtectedRoute>} />
         
              

      </Routes>

      {/* <Footer /> */}

    </>
  );
}

export default App;
