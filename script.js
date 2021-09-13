import React, { useState, useEffect, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";


const BreakControl = ({ breakLength, plusBreak, minusBreak }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "control-box" }, /*#__PURE__*/
    React.createElement("h3", { id: "break-label" }, "Break Length", /*#__PURE__*/React.createElement("br", null), "(min)"), /*#__PURE__*/
    React.createElement("div", { className: "plus-minus" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-minus fa-lg",
      id: "break-decrement",
      onClick: minusBreak }), /*#__PURE__*/

    React.createElement("p", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("i", { className: "fas fa-plus fa-lg",
      id: "break-increment",
      onClick: plusBreak }))));




};

const SessionControl = ({ sessionLength, plusSession, minusSession }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "control-box" }, /*#__PURE__*/
    React.createElement("h3", { id: "session-label" }, "Session Length", /*#__PURE__*/React.createElement("br", null), "(min)"), /*#__PURE__*/
    React.createElement("div", { className: "plus-minus" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-minus fa-lg",
      id: "session-decrement",
      onClick: minusSession }), /*#__PURE__*/
    React.createElement("p", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("i", { className: "fas fa-plus fa-lg",
      id: "session-increment",
      onClick: plusSession }))));



};


const App = () => {
  const alarm = useRef();
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isPaused, setIsPaused] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const switchMode = () => {
    if (timerLabel == 'Session') {
      setTimerLabel('Break');
      setTimeLeft(breakLength * 60);
    } else {
      setTimerLabel('Session');
      setTimeLeft(sessionLength * 60);
    }
  };

  useInterval(() => {
    if (!isPaused && timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft === 0) {
      switchMode();
      alarm.current.play();
    }
  }, !isPaused ? 1000 : null);

  useEffect(() => {
    setTimeLeft(timeLeft);
  }, [timeLeft]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  let handleSessionPlus = () => {
    if (sessionLength < 60 && isPaused) {
      let newLength = sessionLength + 1;
      setSessionLength(newLength);
      setTimeLeft(newLength * 60);
    } else {return;}
  };
  let handleSessionMinus = () => {
    if (sessionLength > 1 && isPaused) {
      let newLength = sessionLength - 1;
      setSessionLength(newLength);
      setTimeLeft(newLength * 60);
    } else {return;}
  };
  let handleBreakPlus = () => {
    if (breakLength < 60 && isPaused) {
      setBreakLength(breakLength + 1);
    } else {return;}
  };
  let handleBreakMinus = () => {
    if (breakLength > 1 && isPaused) {
      setBreakLength(breakLength - 1);
    } else {return;}
  };
  let handleReset = () => {
    setTimerLabel('Session');
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setIsPaused(true);
    alarm.current.pause();
    alarm.current.currentTime = 0;
  };

  const handlePlayPause = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "container" }, /*#__PURE__*/
    React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/
    React.createElement("div", { id: "length-controls" }, /*#__PURE__*/
    React.createElement(SessionControl, {
      plusSession: handleSessionPlus,
      minusSession: handleSessionMinus,
      sessionLength: sessionLength }), /*#__PURE__*/

    React.createElement(BreakControl, {
      plusBreak: handleBreakPlus,
      minusBreak: handleBreakMinus,
      breakLength: breakLength })), /*#__PURE__*/


    React.createElement("div", { className: "control-box" }, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, timerLabel), /*#__PURE__*/
    React.createElement("p", { id: "time-left" },
    Math.floor(timeLeft / 60) < 10 ? '0' + Math.floor(timeLeft / 60) : Math.floor(timeLeft / 60), ":", timeLeft % 60 < 10 ? '0' + timeLeft % 60 : timeLeft % 60), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement("i", { id: "start_stop",
      className: isPaused ? "fas fa-play fa-lg" : "fas fa-pause fa-lg",
      onClick: handlePlayPause }), /*#__PURE__*/
    React.createElement("i", {
      id: "reset",
      className: "fas fa-redo-alt fa-lg",
      onClick: handleReset }))), /*#__PURE__*/



    React.createElement("audio", {
      id: "beep",
      ref: alarm,
      type: "audio",
      src: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" })));


};

ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(App, null)),

document.getElementById('root'));