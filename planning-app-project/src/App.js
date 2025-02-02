import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Planning from "./pages/Planning";
import Events from "./pages/Events";
import Connexion from "./pages/Connexion";
import Regristration from "./pages/Regristration";
import './styles/pages/app.scss'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/events" element={<Events/>} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/registration" element={<Regristration />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
