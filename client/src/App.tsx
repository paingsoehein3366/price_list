import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PriceListApp from './components/PriceListApp';

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="App">
      <PriceListApp />
    </div>
  );
}

export default App;
