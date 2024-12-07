import React, {useState, useEffect} from "react";
import './App.css';

function App() {

  const [serverTime, setServerTime] = useState(null);
  const [serverMetrics, setServerMetrics] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const timerMs = 3000;

  useEffect(() => {
    function retrieveServerTime() {
      setTimeLoading(true);
      console.log("loading...");
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
      })
      .finally(() => {
        console.log("Loading complete!");
        setTimeLoading(false);
      });
    }

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
            {timeLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p>Server time: {serverTime}</p>
                <p className="large">00:00:00</p>  
                {serverError && <p>Error retrieving data. Trying in 30s...</p>}
              </div>
            )}
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <h2>Server response</h2>
            <div className="code-block">
              {metricsLoading ? (
                <div><p>Loading...</p></div>
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
