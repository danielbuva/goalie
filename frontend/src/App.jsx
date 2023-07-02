import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import AllGoals from "./components/Goals/AllGoals";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<AllGoals />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/communities"
          element={<>communities page comming soon</>}
        />
        <Route
          path="/challenges"
          element={<>challenges page comming soon</>}
        />
        <Route path="/:userId" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
