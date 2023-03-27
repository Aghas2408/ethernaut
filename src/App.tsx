import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Fallout from "./pages/Fallout";
import Fallback from "./pages/Fallback";
import HelloEthernaut from "./pages/HelloEthernaut";
import Sidebar from "./components/Sidebar";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/helloEthernaut" element={<HelloEthernaut />} />
          <Route path="/fallback" element={<Fallback />} />
          <Route path="/fallout" element={<Fallout />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
