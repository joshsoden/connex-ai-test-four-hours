import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>
        <section className="light">
          <div className="content">
            <h2>Server Information</h2>
            <p>Server time: 237891273</p>
            <p className="large">00:00:00</p>
          </div>
        </section>

        <section className="dark">
          <div className="content">
            <h2>Server response</h2>
            <div class="code-block">
              <p>responseTime: 1200</p>
              <p>resposneContent: hello</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
