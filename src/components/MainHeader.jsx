import React from "react";
import "./HeaderFooter.css";
import { NavLink } from "react-router-dom";

export default function MainHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-md fixed-top">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand h1 fs-4 text-white">Rescue Kit</NavLink>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end text-uppercase fw-bold" id="nav">
            <ul className="navbar-nav fs-6">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Update</NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/weather" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>Weather Forecast</NavLink>
                  </li>
                  <li>
                    <NavLink to="/news" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>News</NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>History</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Rescue teams</NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/org" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>Organization</NavLink>
                  </li>
                  <li>
                    <NavLink to="/volunteer" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>Volunteer</NavLink>
                  </li>
                  <li>
                    <NavLink to="/donation" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>Donation</NavLink>
                  </li>
                  <li>
                    <NavLink to="/sos" className={({ isActive }) => `dropdown-item ${isActive ? "active-link" : ""}`}>SOS</NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>About Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
