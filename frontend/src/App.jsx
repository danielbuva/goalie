import Accomplished from "./components/Goals/Accomplished";
import UsersChallenges from "./components/Challenges/UsersChallenges";
import UserGoals from "./components/Goals/UserGoals";
import OneChallenge from "./components/OneChallenge";
import PageNotFound from "./components/PageNotFound";
import AllGoals from "./components/Goals/AllGoals";
import ProfilePage from "./components/ProfilePage";
import LandingPage from "./components/LandingPage";
import useSessionUser from "./hooks/useSessionUser";
import { Route, Routes, useLocation } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import Challenges from "./components/Challenges";
import SignupForm from "./components/SignupForm";
import { getCurrUsersGoals } from "./store/goals";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import { useEffect, useLayoutEffect } from "react";
import FollowsTabs from "./components/FollowsTabs";

function App() {
  useFirstVisit();
  useCurrentUsersGoals();
  useScrollToTop();
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route element={<Layout />}>
          <Route path="/:userId/followers" element={<FollowsTabs />} />
          <Route path="/home" element={<AllGoals />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/communities"
            element={<>communities page coming soon</>}
          />
          <Route path="/challenges" element={<Challenges />} />
          <Route
            path="/challenges/:challengeId"
            element={<OneChallenge />}
          />
          <Route path="/:userId" element={<ProfilePage />}>
            <Route path="/:userId" index element={<UserGoals />} />
            <Route
              path="/:userId/challenges"
              element={<UsersChallenges />}
            />
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

function useCurrentUsersGoals() {
  const currentUser = useSessionUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrUsersGoals(currentUser.id));
    }
  }, [currentUser, dispatch]);
}

function useScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);

  return null;
}

export default App;
