import { useState, useEffect } from "react";

function TimerCircle(props) {
  const [timer, setTimer] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [progress, setProgress] = useState(0);
  //   const [timerIcon, setTimerIcon] = useState("timer-button timer-off");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (props.delay === -1) {
        setTimeLeft(timer);
        setProgress(0);
      } else {
        console.log("timer has counted");
        setTimeLeft((timeLeft) =>
          timeLeft > 0 ? timeLeft - 1 : timeLeft === -1 ? timer : 0
        );
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [props.delay, timer]);

  useEffect(() => {
    if (props.delay === 0) {
      timeLeft <= timer && setProgress(100 - (timeLeft / timer) * 100);
    } else if (props.delay === -1) {
      setTimeLeft(timer);
      setProgress(0);
    } else {
      setTimeLeft(timer + props.delay);
      setProgress(0);
    }
  }, [timeLeft, props.delay, timer]);

  useEffect(() => {
    if (timeLeft === 10) {
      props.tenSecondWarning();
    } else if (timeLeft === 0) {
      props.onTimerEnd();
      setTimeLeft(timer);
    }
  }, [timeLeft]);

  function changeTimer() {
    return timer === -1
      ? (setTimer(90), setTimeLeft(90))
      : timer === 90
      ? (setTimer(60), setTimeLeft(60))
      : timer === 60
      ? (setTimer(30), setTimeLeft(30))
      : (setTimer(-1), setTimeLeft(-1), setProgress(0));
  }

  function handleClick(e) {
    props.clickDown(e);
    if (props.position > 0) {
      return;
    }
    changeTimer();
    props.timerSwitch(
      timer === -1 ? 90 : timer === 90 ? 60 : timer === 60 ? 30 : -1
    );
  }

  const radius = 80;
  const strokeWidth = 80;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const circleStyle = {
    stroke: progress < 50 ? "#00a516" : progress < 75 ? "#e0d100" : "#e01a00",
    strokeWidth: strokeWidth,
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: strokeDashoffset,
    fill: "transparent",
  };

  if (timer === -1) {
    return (
      <div
        className="timer-button timer-off"
        id="streak"
        onClick={(e) => {
          console.log(e.target);
          handleClick(e.target);
        }}
      >
        <div
          className="circle-timer"
          //   onClick={(e) => {
          //     console.log(`c timer ${e}`);
          //     handleClick(e.parent);
          //   }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className="timer-button timer-on"
      id="streak"
      onClick={(e) => {
        console.log(e.target);
        handleClick(e.target);
      }}
    >
      <div
        className="circle-timer"
        // onClick={(e) => {
        //   console.log(`c timer ${e}`);
        //   handleClick(e.parent);
        // }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            style={circleStyle}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
        </svg>
        <div className="circle-timer-text">
          {timeLeft > timer ? timer : timeLeft === -1 ? timer : timeLeft}
        </div>
      </div>
    </div>
  );
}

export default TimerCircle;
