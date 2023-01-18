import "./layout.css";
import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutDig() {
  return (
    <div className="App" name="layout-dig-body">
      <div className="Page" name="outlet-dig-body">
        <Outlet />
        {/* Sem router smeruje vsechny podstranky */}
      </div>
    </div>
  );
}
