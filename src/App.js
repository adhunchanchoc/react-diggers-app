import "./App.css";
import { Route, Routes } from "react-router-dom";

import React, { Suspense } from "react";
import LayoutDig from "./components/LayoutDig";
import HomeDig from "./components/HomeDig";

function App() {
  return (
    // namisto primo vraceni HTML radeji smeruje pozadavky z URL adresy na jednotlive stranky, navic zanorene v globalnim divu Layout-dig
    <Routes>
      <Route path="/" element={<LayoutDig />}>
        <Route index element={<HomeDig />} />

        {/* <Route path="/page2" element={<Page2-dig />}/> */}
      </Route>
    </Routes>
    // <div className="App">
    //   <h1>
    //     Hello <small>earth!</small>
    //   </h1>
    // </div>
  );
}

export default App;
