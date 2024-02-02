import React from "react";
import MySidebar from "../components/sidebar/MySidebar";
import "./adminGrid.css";

const AdminGrid = ({ children }) => {

    return (
        <div className="grid__container">
            <div className="grid__sidebar">
                <MySidebar />
            </div>
            <div className="adminGrid__content">
                {children}
            </div>
        </div>
    );
}

export default AdminGrid;