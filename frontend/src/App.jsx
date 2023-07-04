import AllGoals from "./components/Goals/AllGoals";
import ProfilePage from "./components/ProfilePage";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import BaseLayout from "./components/BaseLayout";
import UserGoals from "./components/Goals/UserGoals";
import Accomplished from "./components/Goals/Accomplished";

function App() {
  useFirstVisit();
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
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
          <Route path="/:userId" element={<ProfilePage />}>
            <Route path="/:userId" index element={<UserGoals />} />
            <Route path="/:userId/challenges" />
            <Route
              path="/:userId/accomplished"
              element={<Accomplished />}
            />
            <Route
              path="/:userId/communities"
              element={<>feature coming soon</>}
            />
          </Route>
        </Route>
      </Routes>
    </BaseLayout>
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
