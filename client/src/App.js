import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [serverTime, setServerTime] = useState(null);
  const [serverMetrics, setServerMetrics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/time/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(response => response.text())
      .then((data) => {
        let epochTime = JSON.parse(data).epoch;
        setServerTime(epochTime);
      })
  }, []);

useEffect(() => {
    fetch('http://localhost:5001/metrics/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(res => res.text())
      .then(data => setServerMetrics(data))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>
        <section className="light">
          <div className="content">
            <h2>Server Information</h2>
            <p>Server time: {serverTime}</p>
            <p className="large">00:00:00</p>
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
