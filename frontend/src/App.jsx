import AllGoals from "./components/Goals/AllGoals";
import ProfilePage from "./components/ProfilePage";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import { useEffect } from "react";
import Challenges from "./components/Challenges";
import OneChallenge from "./components/OneChallenge";

function App() {
  useFirstVisit();
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
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="/challenges/:challengeId" element={<OneChallenge />} />
      </Routes>
    </Layout>
  );
}

function useFirstVisit() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasVisited");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}

export default App;
