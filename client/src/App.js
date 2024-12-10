import React, {useState, useEffect} from "react";
import './App.css';

import TimeContainer from "./components/TimeContainer/TimeContainer";

function App() {

  const [serverMetrics, setServerMetrics] = useState([]);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const timerMs = 30000;

  useEffect(() => {

    function retrieveServerMetrics() {
      setMetricsLoading(true);
      console.log("loading...");
      fetch('http://localhost:5001/metrics/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
        .then(res => res.text())
        .then(data => setServerMetrics(parseMetrics(data)))
        .catch(err => {})
        .finally(() => {
          console.log("Loading complete!");
          setMetricsLoading(false);
        });
    }

    function parseMetrics(metrics) {
      let parsedData = convertMetricsToArray(metrics);
      parsedData = filterEmptyStringsFromArray(parsedData);
      parsedData = filterCommentsFromArray(parsedData);
      return parsedData;
    }

    function retrieveServerMetricsAndTime() {
      // retrieveServerTime();
      retrieveServerMetrics();
    }

    retrieveServerMetricsAndTime();

    const intervalId = setInterval(() => {
      retrieveServerMetricsAndTime();
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
            <TimeContainer />
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <h2>Server response</h2>
            <div className="code-block">
              {metricsLoading ? (
                <div><p>Loading metrics...</p></div>
              ) : (
                <div>
                  {serverMetrics.map((metric) => (
                    <p>{metric}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
