import React from "react";
import "./HeaderFooter.css";

export default function MainFooter(){
    return(
        <footer className="bg-dark text-white text-center mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>We provide high-quality rescue kits designed for emergencies, ensuring safety and preparedness for everyone.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                <li><a href="#" className="text-white text-decoration-none">Shop</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
              </ul>
            </div>
          </div>
          <hr className="bg-light" />
          <p className="mb-0">&copy; 2024 Rescue Kit Co. All Rights Reserved.</p>
        </div>
      </footer>
    )
}