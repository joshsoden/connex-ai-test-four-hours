import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  var elapsedTime = 0;
  const [serverTime, setServerTime] = useState(null);
  const [serverMetrics, setServerMetrics] = useState(null);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [displayTime, setDisplayTime] = useState("00:00:00");

  useEffect(() => {
    fetch('http://localhost:5001/time/')
      .then(response => response.text())
      .then(data => setServerTime(data));

    const intervalId = setInterval(() => {
      incrementElapsedTime();
      displaySecondsInFormat();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/metrics/')
      .then(res => res.text())
      .then(data => setServerMetrics(data))
  }, []);

  const incrementElapsedTime = () => {
    elapsedTime++;
    displaySecondsInFormat();
  }

  const displaySecondsInFormat = () => {
    const time = elapsedTime;
    var seconds = Math.floor(time / 1000) % 60;
    var minutes = Math.floor(time / 1000 / 60) % 60;
    var hours = Math.floor(time / 1000 / 60 / 60);
    var display = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    setDisplayTime(display);
  }

  const pad = (number) => {
   return (number < 10 ? "0" : "") + number; 
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>
        <section className="light">
          <div className="content">
            <h2>Server Information</h2>
            <p>Server time: {serverTime}</p>
            <p className="large">{elapsedTime}</p>
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <h2>Server response</h2>
            <div className="code-block">
              <p>{serverMetrics}</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
