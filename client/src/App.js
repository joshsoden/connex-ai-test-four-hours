import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [serverTime, setServerTime] = useState(null);
  const [serverMetrics, setServerMetrics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/time/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(response => response.text())
      .then((data) => {
        let epochTime = JSON.parse(data).epoch;
        setServerTime(epochTime);
      })
  }, []);

  useEffect(() => {
    function parseMetrics(metrics) {
      let parsedData = convertMetricsToArray(metrics);
      parsedData = filterEmptyStringsFromArray(parsedData);
      parsedData = filterCommentsFromArray(parsedData);
      return parsedData;
    }

    fetch('http://localhost:5001/metrics/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(res => res.text())
      .then((data) => {
        setServerMetrics(parseMetrics(data));
      })
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
