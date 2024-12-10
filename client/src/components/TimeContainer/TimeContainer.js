import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TimeContainer.module.css';

function TimeContainer() {
  const [serverTime, setServerTime] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const retrieveServerTime = () => {
    setLoading(true);
    fetch('http://localhost:5001/time/', {headers: {authorization: process.env.REACT_APP_ACCESS_TOKEN}})
    .then(response => response.text())
    .then((data) => {
      let epochTime = JSON.parse(data).epoch;
      setServerTime(epochTime);
      setTimer(0);
      setError(false);
    })
    .catch(err => {
      console.log("Error retrieving data");
      setError(true);
    })
    .finally(() => {
      console.log("Loading complete!");
      setLoading(false);
    });
  }
  
   // For the timer
   useEffect(() => {
    setTimer(prevTimer => prevTimer + 1);
  
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }


  return (
    <div className={styles.TimeContainer}>
    <h2>Server Information</h2>
    <div>
      {loading ? (
        <p>Server time: Loading...</p>
      ) : (
        <p>Server time: {serverTime}</p>
      )} 
      {error && <p>Error retrieving data. Trying in 30s...</p>}
      <p class="large">{formatTime(timer)}</p>
    </div>
  </div>
  )
}

TimeContainer.propTypes = {};

TimeContainer.defaultProps = {};

export default TimeContainer;
