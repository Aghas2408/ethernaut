import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Token from "./pages/Token";
import Fallout from "./pages/Fallout";
import Fallback from "./pages/Fallback";
import CoinFlip from "./pages/CoinFlip";
import Telephone from "./pages/Telephone";
import HelloEthernaut from "./pages/HelloEthernaut";

import "./App.css";
import Delegation from "./pages/Delegation";
import Force from "./pages/Force";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/helloEthernaut" element={<HelloEthernaut />} />
          <Route path="/fallback" element={<Fallback />} />
          <Route path="/fallout" element={<Fallout />} />
          <Route path="/coinFlip" element={<CoinFlip />} />
          <Route path="/telephone" element={<Telephone />} />
          <Route path="/token" element={<Token />} />
          <Route path="/delegation" element={<Delegation />} />
          <Route path="/force" element={<Force />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
