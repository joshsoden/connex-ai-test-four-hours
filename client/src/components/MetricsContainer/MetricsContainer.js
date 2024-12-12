import { React, useState, useEffect } from 'react';
import styles from './MetricsContainer.module.css';


function MetricsContainer() {
  const [serverMetrics, setServerMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveServerMetrics();

    const intervalId = setInterval(() => {
      retrieveServerMetrics();
    }, process.env.REACT_APP_TIMER_MS);
  
    return () => clearInterval(intervalId);
  }, []);

  function retrieveServerMetrics() {
    setLoading(true);
    console.log("loading...");

    fetch('http://localhost:5001/metrics/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
      .then(res => res.text())
      .then(data => setServerMetrics(parseMetrics(data)))
      .catch(err => {})
      .finally(() => {
        console.log("Loading complete!");
        setLoading(false);
      });
  }

  function parseMetrics(metrics) {
    let parsedData = convertMetricsToArray(metrics);
    parsedData = filterEmptyStringsFromArray(parsedData);
    parsedData = filterCommentsFromArray(parsedData);
    return parsedData;
  }

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
      <>
      <h2>Server response</h2>
      <div className="code-block">
        {loading ? (
          <div><p>Loading metrics...</p></div>
        ) : (
          <div>
            {serverMetrics.map((metric) => (
              <p>{metric}</p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MetricsContainer;
