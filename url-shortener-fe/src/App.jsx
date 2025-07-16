// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { getApps } from "../utils/helper";
import "./App.css";

function App() {
  const CurrentApp = getApps(); // AppRouter or SubDomainRouter

  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  );
}

export default App;
