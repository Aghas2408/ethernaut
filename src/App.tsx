import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Token from "./pages/Token";
import Fallout from "./pages/Fallout";
import Fallback from "./pages/Fallback";
import CoinFlip from "./pages/CoinFlip";
import Telephone from "./pages/Telephone";
import HelloEthernaut from "./pages/HelloEthernaut";
import Vault from "./pages/Vault";
import Force from "./pages/Force";
import Delegation from "./pages/Delegation";
import King from "./pages/King";
import ReEntrancy from "./pages/Re-entrancy";
import Elevator from "./pages/Elevator";
import Privacy from "./pages/Privacy";
import GatekeeperOne from "./pages/GatekeeperOne";
import GatekeeperTwo from "./pages/GatekeeperTwo";
import NaughtCoin from "./pages/NaughtCoin";

import "./App.css";

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
          <Route path="/vault" element={<Vault />} />
          <Route path="/king" element={<King />} />
          <Route path="/reEntrancy" element={<ReEntrancy />} />
          <Route path="/elevator" element={<Elevator />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/gatekeeperOne" element={<GatekeeperOne />} />
          <Route path="/gatekeeperTwo" element={<GatekeeperTwo />} />
          <Route path="/naughtCoin" element={<NaughtCoin />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
