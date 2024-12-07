import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [serverTime, setServerTime] = useState(null);
  const [serverMetrics, setServerMetrics] = useState([]);
  const [serverError, setServerError] = useState(false);
  const timerMs = 3000;

  useEffect(() => {
    function retrieveServerTime() {
      fetch('http://localhost:5001/time/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(response => response.text())
      .then((data) => {
        let epochTime = JSON.parse(data).epoch;
        setServerTime(epochTime);
        setServerError(false);
      })
      .catch(err => {
        console.log("Error retrieving data");
        setServerError(true);
      });
    }

    function retrieveServerMetrics() {
      fetch('http://localhost:5001/metrics/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
        .then(res => res.text())
        .then(data => setServerMetrics(parseMetrics(data)))
        .catch(err => {});
    }

    function parseMetrics(metrics) {
      let parsedData = convertMetricsToArray(metrics);
      parsedData = filterEmptyStringsFromArray(parsedData);
      parsedData = filterCommentsFromArray(parsedData);
      return parsedData;
    }

    const intervalId = setInterval(() => {
      retrieveServerTime();
      retrieveServerMetrics();
    }, timerMs);

    return () => clearInterval(intervalId);
  }, []);

  const convertMetricsToArray = (metrics) => {
    return metrics.split("\n");
  }

  const filterEmptyStringsFromArray = (array) => {
    return array.filter((str) => str.length > 0);
  }

  const filterCommentsFromArray = (array) => {
    return array.filter((str) => str[0] !== "#");
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
            <p className="large">00:00:00</p>
            {serverError && <p>Error retrieving data. Trying in 30s...</p>}
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <h2>Server response</h2>
            <div className="code-block">
              {serverMetrics.map((metric) => (
                <p>{metric}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
