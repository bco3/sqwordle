import React from "react";
import ReactDOM from "react-dom/client";
// import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { App } from "./App";
import { App6 } from "./App6";
import gsap from "gsap";

const clickDown = () => {
  gsap.from(".game-size", {
    scale: 0.8,
    duration: 0.3,
  });
};
function Index() {
  const [useApp, setUseApp] = React.useState(true);

  function toggleApp() {
    setUseApp(!useApp);
  }

  return (
    <>
      <div
        className="game-size"
        onClick={() => {
          toggleApp();
          clickDown();
        }}
      >
        {" "}
        {useApp ? (
          <span className="fine">
            <span className="bold">5</span>/6
          </span>
        ) : (
          <span className="fine">
            5/<span className="bold">6</span>
          </span>
        )}
      </div>
      {useApp ? <App /> : <App6 />}
    </>
  );
}

// ReactDOM.render(<Index />, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
