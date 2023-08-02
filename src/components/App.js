import './App.css';
import WeatherCard from './WeatherCard';
import Top from './Top';

function App() {
  return (
    <div className="App">
      <Top />

      {/* really hope that this is right */}
      <WeatherCard userLocation="Vancouver" />


    </div>
  );
}

export default App;
