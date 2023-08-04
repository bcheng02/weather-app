import './App.css';
import WeatherCard from './WeatherCard';



function App() {

  function yo(x) {
    console.log("yo" + x)
  }

  return (
    <div className="App">
      {/* <Top onClickSearch={yo} /> */}

      <WeatherCard />


    </div>
  );
}

export default App;
