import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Layout from "./components/Layout";
import Goals from './components/Goals'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Goals/>}/>
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/signup" element={<SignupFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
