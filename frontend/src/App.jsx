import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import Goals from './components/Goals'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Goals/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
