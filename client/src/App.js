import React from "react";
import './App.css';

import TimeContainer from "./components/TimeContainer/TimeContainer";
import MetricsContainer from "./components/MetricsContainer/MetricsContainer";

function App() {  
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>
        <section className="light">
          <div className="content">
            <TimeContainer></TimeContainer>
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <MetricsContainer></MetricsContainer>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
