import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import About from "./About";
import Login from "./Login";
import Profile from "./Profile";
import Error from "./Error";
import water from "./assets/images/water.png";
import water2 from "./assets/images/darkWater.png";
import icon from "./assets/images/Icon.png";
import sun from "./assets/images/Sun.png";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function App() {
  const [theme, setTheme] = useState(getStorageTheme());
  const [img, setImg] = useState(undefined);
  const [Icon, setIcon] = useState(null);

  const toggleTheme = () => {
    setImg(false);
    const water = document.querySelector(".water-img");
    const water2 = document.querySelector(".water-img2");
    const back = document.querySelector(".login-box");

    if (theme === "light-theme") {
      setTheme("dark-theme");

      water.style.display = "none";
      water2.style.display = "flex";
    } else {
      setTheme("light-theme");

      water.style.display = "flex";
    }
    if (theme) {
      setImg(false);
    }
  };
  useEffect(() => {
    if (theme === "light-theme") {
      setIcon(icon);
    } else {
      setIcon(sun);
    }
  });
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  let width = window.screen.width;

  // const changeBackPhone = () => {
  //   let back = document.querySelector(".backBody");
  //   if (width <= 500 && theme === "light-theme") {
  //     back.style.backgroundImage = `url(${water2})`;
  //   }
  // };
  // useEffect(() => {
  //   changeBackPhone();
  // }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login Icon={Icon} toggleTheme={toggleTheme} img={img} />}
          />
          <Route
            exact
            path={`/profile/:user/:name/:img`}
            element={<Profile />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
