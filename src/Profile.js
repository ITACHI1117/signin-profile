import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { useParams, Link } from "react-router-dom";
import pro from "./assets/images/pro.png";

function Profile() {
  const { user, name, img } = useParams();
  const [names, setNames] = useState(name);
  const [images, setImages] = useState(img);

  const removeForm = (e) => {
    e.preventDefault();
    let formRemove = document.querySelector(".username-form");

    formRemove.style.display = "none";
  };
  const closeForm = () => {};
  const getNames = () => {
    if (name == "null") {
      return (
        <article>
          <form className="username-form" onSubmit={removeForm}>
            <input
              className="input1"
              placeholder="Enter your User name"
              type="text"
              name="names"
              onChange={(e) => setNames(e.target.value)}
            />
            <button type="submit">Done</button>
          </form>
        </article>
      );
      // setNames();
    }
  };

  useEffect(() => {
    if (img === "null") {
      setImages(pro);
    }
  }, []);

  // return (
  //   // <>
  //   //   <form
  //   //     onSubmit={(e) => {
  //   //       e.preventDefault();
  //   //       setImages(images);
  //   //     }}
  //   //     className="form1"
  //   //   >
  //   //     <input
  //   //       className="custom-file-input"
  //   //       type="file"
  //   //       accept="image/png, image/jpeg"
  //   //       onChange={(e) => setImages(e.target.value)}
  //   //     />
  //   //     <button type="submit"></button>
  //   //   </form>
  //   // </>
  // );

  return (
    <section className="profile-back">
      <article className="card">
        <div className="circle1"></div>
        <div className="cover-img">
          <img className="profileImg" src={images} alt="profileImg" />
        </div>
        {getNames()}
        <h1>{names}</h1>
        <h3>{user}</h3>
        <div className="welcome">
          <h2>Welcome</h2>
        </div>
        <div className="circle2"></div>
      </article>
    </section>
  );
}

export default Profile;
