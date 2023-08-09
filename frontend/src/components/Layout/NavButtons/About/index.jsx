import { useTheme } from "../../../../hooks/useTheme";
import "./About.css";

function About() {
  const { theme } = useTheme();

  return (
    <div>
      <h1>About goaly</h1>
      <div className="about-wrapper">
        <div>
          <img
            style={{ marginBottom: "30px" }}
            alt="logo"
            src={theme === "light" ? "android-chrome-192x192.png" : "light-theme-logo.png"}
          />
          <p>
            Welcome to goaly! This is a space for you to share and support friends' goals. If you need some
            organization and accountability, you've come to the right place. Cheers to continuous
            self-growth🥂
          </p>
        </div>
        <div>
          <h1 className="about-title">Goals + Challenges</h1>
          <p>Encourage and be encouraged to complete goals with "doit". Groups with common goals can create and categorize challenges for a shared sense of accomplishment.</p>
          <img style={{height:"220px", width: "220px"}} alt="icons" src="icons.png"/>
        </div>
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{ width: "220px" }}>
          <h1 className="about-title">Profiles</h1>
          <div style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}><img style={{width: "400px"}}alt="profile" src="goaly2.png" /></div>
          <p style={{marginBottom:"20px"}}>Customize your profile with a profile picture and banner! You can also track your goals, challenges, and followers here.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
